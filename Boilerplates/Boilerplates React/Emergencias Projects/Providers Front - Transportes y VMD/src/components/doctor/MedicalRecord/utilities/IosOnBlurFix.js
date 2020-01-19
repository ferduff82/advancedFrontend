
function IosOnBlurFix() {

    function isiOS() { return navigator.userAgent.match(/ipad|ipod|iphone/i); }
    
    if (isiOS()){
        var ins = [], _ins = document.querySelectorAll("input")
        for(var i = 0; i <ins.length; i++) ins.push(_ins[i])
        document.body.addEventListener('touchstart', event => {
          if(ins.filter(i => i.contains(event.target)).length == 0)
            document.activeElement.blur()
        });
    }
}

export default IosOnBlurFix;
