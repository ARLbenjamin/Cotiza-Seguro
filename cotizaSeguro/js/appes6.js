//constructor seguros
 class Seguro{
constructor(marca, anio, tipo){
    this.marca= marca;
    this.anio= anio;
    this.tipo=tipo;
}
cotizarSeguro(){
    
    /* Tabla de las referencias para calculo
    1=> Americano => 1.15
    2=> Asiatico => 1.05
    3=> Europeo => 1.35
    */
    let cantidad;
    const base= 2000;
  
    switch(this.marca){
      
      case '1':
          cantidad= base*1.15;
          break;
      case '2':
          cantidad= base*1.05;
          break;
      case '3':
          cantidad= base*1.35;
          break;
    }
    
    //valorizar por el año
    const diferenicas= new Date().getFullYear() - this.anio;
  
    //cada año de diferencia reduce el valor del seguro 3%
    cantidad= cantidad-(cantidad*(diferenicas*0.03));
    
    /*
    si el seguro es basico se le agrega un 30%
    si el seguro es completo se le agrega un 50%
    */
  
    if(this.tipo=== 'basico'){
        cantidad= cantidad*1.30;
    } else{
        cantidad= cantidad*1.50;
    }
    
    return cantidad;
  
  }
    }

    class Interfaz{
        mostrarError(mensaje, tipo){
    
            const div= document.createElement('div');
        
            if(tipo=== 'Error'){
                div.classList.add('mensaje','Error');
            } else{
                div.classList.add('mensaje','Exito');
            }
          div.innerHTML= `${mensaje}`;
          formulario.insertBefore(div, document.querySelector('.form-group'));
        
        setTimeout(function() {
          document.querySelector('.mensaje').remove();
        }, 5000);
        }
    
        presentarResultados(seguro, pago){
    
            const resultado= document.querySelector('#resultado');
            let marca;
            switch(seguro.marca){
                case '1':
                marca= 'Americano';
                break;
                case '2':
                marca= 'Asiatico';
                break;
                case '3':
                marca= 'Europeo';
                break;
            }
            //insertar los elementos al HTML
            
            const div= document.createElement('div');
            
            div.innerHTML= `
             <p class= 'header'>Tu Resumen de Cotizacion: </p>
            
             <p>Marca: ${marca} </p>
            
             <p>Año: ${seguro.anio} </p>
            
             <p>Tipo: ${seguro.tipo} </p>
            
             <p>Total: $ ${pago} </p>
            
            `;
            
            const spinner= document.querySelector('#cargando img');
            spinner.style.display= 'block';
            
            setTimeout(function(){
            spinner.style.display= 'none';
            resultado.appendChild(div);
            }, 3000);
            
            
            
            }
    }
   
    
  
    
    //event listeners
    
    const formulario= document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', function(e){
    
    e.preventDefault();
    
    //leer marca seleccionada del select
    
    const marca= document.querySelector('#marca');
    const marcaElejida= marca.options[marca.selectedIndex].value;
    
    //leer el año seleccionado
    
    const fecha= document.querySelector('#anio');
    const fechaElejida= fecha.options[fecha.selectedIndex].value;
    
    //lee el valor del radio button
    
    const rButton= document.querySelector('input[name="tipo"]:checked').value;
    
    //instancia de interfaz
    
    const interfaz= new Interfaz();
    
    
    
    //imprimir resultados de la cotizacion
    
    
    
    // revisar que los campos no esten vacios
    
    if(marcaElejida ==='' || fechaElejida === '' || rButton ===''){
    
        interfaz.mostrarError('faltan datos, revisa el formulario', 'Error');
    
    } else{
        //limpiar resultados anteriores
    const resultados= document.querySelector('#resultado div');
    if(resultados != null){
      resultados.remove();
      }
    
        const seguro= new Seguro(marcaElejida, fechaElejida, rButton);
    
        //cotizar seguro
    const pago= seguro.cotizarSeguro(seguro);
    
        //mostrar resultado
        interfaz.presentarResultados(seguro, pago);
        interfaz.mostrarError('Cotizando...','Exito');
    }
    
    })
    
    
    
    const max= new Date().getFullYear();
    const min= max-20;
    
    const periodo= document.querySelector('#anio');   
    
    for(let i=min; i <= max; i++){
    
     let option= document.createElement('option');
     option.vaule= i;
     option.innerHTML= i;
     periodo.appendChild(option);
    
    }