/* eslint-disable no-loop-func */

import React,{ useRef,useState } from 'react'
import {useDispatch} from 'react-redux'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import {TableTramos} from './TableTramos'
import * as jsPDF from 'jspdf'
import '../../styles/Despachos.scss';

const language = {
  body: {
    emptyDataSourceMessage: 'No hay resultados que mostrar'
  },
  toolbar: {
    searchTooltip: 'Búsqueda',
    searchPlaceholder: 'Buscar',
    nRowsSelected:'{0} fila(s) seleccionadas'
  },
  pagination: {
    labelRowsSelect: 'Filas',
    labelDisplayedRows: ' {from}-{to} de {count}',
    firstTooltip: 'Principio',
    previousTooltip: 'Anterior',
    nextTooltip: 'Siguiente',
    lastTooltip: 'Ultima'
  },
  grouping: {
    placeholder:'Arrastra un filtro aquí para agruparlo',
    groupedBy:'Agrupado por:'
  }
}

export const CustomTable = ({data, columns, title, isTramo}) => {
  const dispatch = useDispatch()
  return(
    <MaterialTable
      columns={columns}
      data={data}
      title={title}
      detailPanel={
        [{
          tooltip: 'Detalle',
          render:  rowData => {
            if(isTramo){
              dispatch({type: "SET_ROW_TRAMO_DETAIL", payload: rowData})
              dispatch({type: "SET_ROW_TRAMO", payload: rowData.request})
            }else{
              dispatch({type: "SET_ROW_TRASLADO", payload: rowData})
            }
            return (<TableTramos isTramo={isTramo} rowData={rowData} />)
          }
        }]
      }
      localization={language}
      options={{
        pageSize:20,
        showTitle:false,
        pageSizeOptions:[20,50,100],
        search: true,
        grouping:true,
        searchFieldAlignment:'left',
        searchFieldStyle: {
          height: '45px',
          marginTop: '20px',
          marginBottom: '15px',
          color: '#989898'
        },
        rowStyle:(rowData)=>{
          if(rowData.geo_watcher && rowData.geo_watcher.inconsistency){
           if(rowData.geo_watcher.inconsistency === 'no'){
            return ({background:'rgba(156, 255, 156, 0.39)'})             
          }else if(rowData.geo_watcher.inconsistency === 'si'){
            return ({background:'rgba(255, 152, 73, 0.52)'})
           }
          }
        },
        detailPanelType: "single",
        headerStyle: {
          backgroundColor: '#EBEBEB',
          color: '#B1B1B1',
          position:'sticky',
          top:'0px'
        }, 
        //maxBodyHeight: '80vh' 
      }}
    />
  )
}

export const SimpleTableWithGroups = ({data, columns, title, exp}) => {
  return(
    <MaterialTable
      columns={columns}
      data={data}
      title={title}
      localization={language}
      options={{
        grouping:true,
        pageSize:10,
        doubleHorizontalScroll:true,
        showTitle:false,
        pageSizeOptions:[10,20,50,100],
        exportButton: exp || false,
        search: true,
        searchFieldAlignment:'left',
        searchFieldStyle: {
          height: '45px',
          marginTop: '20px',
          marginBottom: '0',
          color: '#989898'
        },
        detailPanelType: "single",
        debounceInterval: 500,
        headerStyle: {
          backgroundColor: '#EBEBEB',
          color: '#B1B1B1',
          position:'sticky',
          top:'0px'
        }, 
        //maxBodyHeight: '80vh' 
      }}
    />
  )
}

export const SimpleTable = ({data, columns, title, exp}) => {
  return(
    <MaterialTable
      columns={columns}
      data={data}
      title={title}
      localization={language}
      options={{
        pageSize:10,
        doubleHorizontalScroll:true,
        showTitle:false,
        pageSizeOptions:[10,20,50,100],
        exportButton: exp || false,
        search: true,
        searchFieldAlignment:'left',
        searchFieldStyle: {
          height: '45px',
          marginTop: '20px',
          marginBottom: '0',
          color: '#989898'
        },
        detailPanelType: "single",
        debounceInterval: 500,
        headerStyle: {
          backgroundColor: '#EBEBEB',
          color: '#B1B1B1',
          position:'sticky',
          top:'0px'
        }, 
        //maxBodyHeight: '80vh' 
      }}
    />
  )
}

export const SelectionTable = ({data, columns, title}) => {
  const table_ref = useRef();
  const dispatch = useDispatch();
  const external_document_list = ['path_dni','path_dni_back','path_dni_barcode','path_profile_pic'];
  const [docprint, setDocprint] = useState(0);
  const eval_render = (counter, length_elems ,pdf, DATA_NAME)=>{
    if(counter === length_elems ){
      setDocprint(Number(docprint)-1);
      pdf.save(`${DATA_NAME}.pdf`)
      if(docprint <= 0 ){
        dispatch({type: "LOADING_PDF", payload: {state:false, counter:`finalizado`}})
      }
    }else{
      dispatch({type: "LOADING_PDF", payload: {state:true, counter:`${DATA_NAME} | Documentos ${counter} de ${length_elems}`}})
    }
  }

  const handleSelectionExport = (providers_selected)=>{
      let documents_availables = [];
      providers_selected = providers_selected.map((provider)=>{
        let doc_list = [];
        if(provider.documents){
          documents_availables = [...documents_availables,...Object.getOwnPropertyNames(provider.documents)];
          doc_list = Object.getOwnPropertyNames(provider.documents)
        }
      external_document_list.forEach((doc_key)=>{
        if(provider[doc_key] && provider[doc_key] !== ''){
          doc_list.push(doc_key)
        }
      })
      provider = {...provider, doc_list: doc_list};
      return provider;
    })
    const docs_filtered = documents_availables.filter((item, position)=> documents_availables.indexOf(item) === position );
    console.log( [docs_filtered, providers_selected])
    return [docs_filtered, providers_selected];
  }

  const export_documentation = (documents)=>{
    //obtener lista de documentos posibles dentro de la seleccion y los proveedores con doc_list disponibles.
    const [docs_filtered, providers_selected] = handleSelectionExport(documents);
    if(providers_selected && providers_selected.length > 0){
      let actual_provider = [];
      setDocprint(providers_selected.length);
      for(let i=0; i < providers_selected.length; i++){
        actual_provider = [];
        //por cada documento reviso la lista de documentos disponibles.
        providers_selected[i].doc_list.forEach((doc_available)=>{
          //creo el pdf con ese documento
          actual_provider.push({...providers_selected[i], is_external: external_document_list.includes(doc_available), pdf_to_print:doc_available});
        })
        create_pdf(actual_provider);
      }
    }
    
    if(docprint <= 0){
      dispatch({type: "LOADING_PDF", payload: {state:false, counter:`finalizado`}})
    }
  }

  const create_pdf = (selected_info)=>{
    let pdf = new jsPDF()
    let counter = 0;    
    selected_info.forEach(doc => {
      let img = new Image();
      img.crossOrigin = 'CORS';
      img.onload = ()=>{
          let canvas = document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'), dataURL;
          canvas.height = img.height;
          canvas.width = img.width;
          ctx.drawImage(img, 0, 0);
          dataURL = canvas.toDataURL();
          pdf.text(`DOC: ${doc.pdf_to_print}`, 20, 20);
         // pdf.text(`ROL: ${doc.rol}`, 20, 50);
          pdf.addImage(dataURL, 'PNG', 15, 50,180, 100);
          canvas = null;
          counter+=1; 
          if(counter !== selected_info.length ){
            pdf.addPage('a4', "portrait");
          }
          eval_render(counter, selected_info.length, pdf,`${doc.cuit}_${doc.fullname}_`)
      };
      if(doc.is_external){
        img.src = doc[doc.pdf_to_print];
      }else{
        img.src = doc.documents[doc.pdf_to_print];
      }
    })
    //pdf.save('a4.pdf')
  }

  var theme = createMuiTheme({
    palette: {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#ff9100',
      },
    },
  });

  return(
    <>
    {
    /*<button onClick={() => table_ref.current.onAllSelected(true)}>
      Seleccionar Todos
    </button>
    <button onClick={() => table_ref.current.onAllSelected(false)}>
      Deseleccionar Todos
    </button>*/}
    <MuiThemeProvider theme={theme}>
      <MaterialTable
        tableRef={table_ref}
        columns={columns}
        data={data}
        title={title}
        localization={language}
        options={{
          grouping:true,
          selection:true,
          pageSize:10,
          showTitle:false,
          pageSizeOptions:[10,20,50,100],
          search: true,
          searchFieldAlignment:'right',
          searchFieldStyle: {
            height: '45px',
            marginTop: '20px',
            marginBottom: '20px',
            color: '#989898'
          },
          detailPanelType: "single",
          debounceInterval: 500,
          headerStyle: {
            backgroundColor: '#EBEBEB',
            color: '#B1B1B1',
            position:'sticky',
            top:'0px'
          }, 
          ////maxBodyHeight: '80vh' 
        }}
        actions={[{
          tooltip: 'Exportar',
          icon: 'save',
          onClick: (evt, selected_info) => export_documentation(selected_info)
        }]}
      />
    </MuiThemeProvider>
    </>
  )
}