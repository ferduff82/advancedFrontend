import React,{useState} from 'react';
import axios from 'axios';

export default ()=>{

    const [fileContent, setFileContent] = useState('');
    const [murmurRes, setMurmurRes] = useState('');
    const [loading, setLoading] = useState(false);

    const convertFileToBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onload = () => resolve({
            fileName: file.title,
            base64: reader.result
        });
        reader.onerror = reject;
    });

    const handleFileChange = e =>{
        setFileContent(e.target.files[0])
        
        console.log(e.target.files[0]);
    }

    const respons = ()=>{
        convertFileToBase64(fileContent).then((res)=>{
            console.log(res.base64.slice(22));
            postMurmur(res.base64.slice(22));
        })
    }

    const postMurmur = (b64) =>{
        let URL = `https://pol-dot-uma-v2.appspot.com/sound_online`;
        setLoading(true)
        axios.post(URL, {
            assignation_id:'2019-04-23_12-04-17',
            ws: '447462391503',
            dni: '95746359',
            dt:'2019-04-05 12:00:00',
            b64:`${b64}`,
            sex: '',
            age:'',
            voice:'1'  
        }).then((res)=>{
            setLoading(false)
            setMurmurRes(res.data.murmur_probability)
            console.log(res);
        }).catch((e)=>{
            setLoading(false)
            console.error(e);
            alert('Ocurrió un error inesperado, por favor vuelva a intentar más tarde.')
        })
    }


    return <div>
        <input type="file" onChange={handleFileChange} placeholder="subir"/>
        <button onClick={respons} disabled={loading}>Enviar Murmur</button>
        <h5>Probabilidades de soplo: {murmurRes}</h5>
    </div>
}

