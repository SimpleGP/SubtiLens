function sololetras(event){
             
                var numero = event.keyCode;
                if((numero < 65 && numero!=32 )||(numero > 90&&numero<97)||(numero>122 )){
                    event.preventDefault();
                   return false;
                }
                else{
                    return true;
                }
            }