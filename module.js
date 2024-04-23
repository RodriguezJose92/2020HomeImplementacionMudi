/* Petición Sever_____Mudi */
async function serverData ({
    token = undefined,
    sku = undefined
  }) {
  
    // Errores
    if (token == null) { console.error('Error Mudi: Token Api Null') ;  return }
    if ( sku == null)  { console.error('Error Mudi: SKU Null') ;  return}
  
    // Respuesta positiva 
    let contentBody = { "skus": [`${sku}`] }
  
    const req = await fetch ('https://mudiview.mudi.com.co:7443/product/getProductsUrl' , {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'tokenapi':token
      },
      body: JSON.stringify(contentBody)
    })
  
    const jsonResponse = await req.json();
    const finalResponse = jsonResponse.data[0];
  
    return finalResponse;
  
};

/** Creamos Los estilos remotos */
function createStyles({idCompany}){
  const link = document.createElement('LINK');
  link.setAttribute('rel','stylesheet');
  link.id="stylesMudiGeneral";
  link.href=`https://mudi.com.co/module/mudi/index-${idCompany}.css`; /* Pueden tomarlos de esta ruta */
  
  document.head.appendChild(link)
};

/** Cuando se obtiene una respuesta positiva del server se crean dos botones ( btn3D y btnAR ) */
function createBtns({father,sku,idCompany,link3D,color,zBtns,zModal,ButtonsY}){

  const fatherContainer = father;

  // Creación del contenedor principal para los botones
  const containerPrincipalBtns = document.createElement('DIV');
  containerPrincipalBtns.classList.add('ContainerBtnsMudi');
  containerPrincipalBtns.id="containerBtnsMudi";
  containerPrincipalBtns.setAttribute('style',`z-index:${zBtns}; ${ButtonsY}:0`)
  
  containerPrincipalBtns.innerHTML=`
  <div class="tooltip showTooltipInit">
    <p><b>¡Nuevo!</b> prueba nuestras experiencias de 3D y Realidad Aumentada</p>
  </div>
  <img src="https://mudi.com.co/cliente/${idCompany}/btn3D.webp" alt="Boton Mudi para activar 3D" class="btnMudi3D" id="btnMudi3D" sku=${sku} title="Haz click para tener una experiencia 3D">
  <img src="https://mudi.com.co/cliente/${idCompany}/btnAR.webp" alt="Boton Mudi para activar AR" class="btnMudiAR" id="btnMudiAR" sku=${sku} title="Haz click para tener una experiencia de realidad aumentada">`;
  
  containerPrincipalBtns.querySelector('.btnMudi3D').addEventListener('click',()=>{ createModal3D({link3D:link3D,color:color,zModal:zModal}) },false);
  containerPrincipalBtns.querySelector('.btnMudiAR').addEventListener('click',()=>{ createModalAR({color:color, idCompany:idCompany, sku:sku,zModal:zModal}) },false);

  const elementoHermano = document.querySelector('.product-thumbnails');
  fatherContainer.insertBefore(containerPrincipalBtns , elementoHermano);

  setTimeout(()=>{
    const tool = document.querySelector('.showTooltipInit');
    tool.classList.remove('showTooltipInit')
    tool.classList.add('hideTooltip')
  },10000)

};

/** Creamos el modal 3D */
function createModal3D({link3D,color,zModal}){

  const div = document.createElement('DIV')
  div.classList.add('modalMudi')
  div.id="modalMudi";
  div.setAttribute('style',`z-index:${zModal}`);
  div.innerHTML=`
  <div class="contentModal3D">
    <h1 class="closeModal" style="color:${color}; text-align:end">X</h1>
    <iframe class="iframeMudi3D" src="${link3D}"></iframe>
    <a href="https://mudi.com.co" target="_blank">
      <img class="powerByMudi3D" src="https://mudi.com.co/Assets/SVG/powerByMudi.webp" type="image/webp" alt="Power By Mudi">
    </a>
  </div>`;

  div.querySelector('.closeModal').addEventListener('click',()=>{
    document.body.querySelector('.modalMudi').remove();
  })

  document.body.appendChild(div);
};

/** Creamos el Modal AR */
function createModalAR({color,idCompany,sku,zModal}){
  const div = document.createElement('DIV')
  div.classList.add('modalMudi')
  div.id="modalMudi";
  div.setAttribute('style',`z-index:${zModal}`);
  div.innerHTML=`
    <div class="contentModalAR">
        <h1 class="closeModal" style="color:${color}; text-align:end;">X</h1>
        <h2 class="modalTitleMudi">Recomendaciones para ver el producto en Realidad Aumentada.</h2>

        <div class="principalContentModalAR">

            <div class="fristContentMudi">

                <div class="containerMudiSteps">
                    <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step1.webp">
                    <div class="containerStepsText">
                        <h3 class="stepTitleMudi">Apunta tu teléfono al piso para ver el producto.</h3>
                        <p class="stepParagrahpMudi">Prueba otro espacio si no puedes ver el producto.</p>
                    </div>
                </div>

                <div class="containerMudiSteps">
                    <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step2.webp">
                    <div class="containerStepsText">
                        <h3 class="stepTitleMudi">Desplaza para visualizar.</h3>
                        <p class="stepParagrahpMudi">Mueve tu dedo en la pantalla para rotar la imagen.</p>
                    </div>
                </div>

                <div class="containerMudiSteps">
                    <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step3.webp">
                    <div class="containerStepsText">
                        <h3 class="stepTitleMudi">Amplia y detalla el producto.</h3>
                        <p class="stepParagrahpMudi">Controla el zoom arrastrando dos dedos en la pantalla de adentro hacia afuera.</p>
                    </div>
                </div>

                <div class="containerMudiSteps">
                    <img class="imgStepMudi" src="https://mudi.com.co/cliente/${idCompany}/step4.webp">
                    <div class="containerStepsText">
                        <h3 class="stepTitleMudi">Toca dos veces para restablecer.</h3>
                        <p class="stepParagrahpMudi">Vuelve al tamaño original haciendo doble click sobre el producto.</p>
                    </div>
                </div>

                <button class="initARMudi" style="background-color:${color};">Iniciar AR</button>

            </div>

            <div class="secondContentMudi">
                <h3 class="stepTitleMudi qrTitlePart"> Escanea el código QR para ver el producto en realidad aumentada.</h3>
                <div class="containerQRMudi">
                  <img src="https://viewer.mudi.com.co/v1/qr/?id=${idCompany}&sku=${sku}" class="codeQRMudi">
                </div>
                <a class="hrefMudiAR" href="https://mudi.com.co" target="_blank">
                  <img class="powerByMudiAR" src="https://mudi.com.co/Assets/SVG/powerByMudi.webp" type="image/webp" alt="Power By Mudi">
                </a>
            </div>

        </div>

    </div>`;

    div.querySelector('.closeModal').addEventListener('click',()=>{
      document.body.querySelector('.modalMudi').remove();
    });

    div.querySelector('.initARMudi').addEventListener('click',()=>{
      window.open(`https://viewer.mudi.com.co/v1/ar/?id=${idCompany}&sku=${sku}`)
    })

    document.body.appendChild(div);
};

/**Envío de data DataLayer */
let skuMudi = null;
let verifyCategories = 0;
function sendDataLayer({sku}){

  if(!skuMudi){skuMudi=sku};

  let migaDePan   = document.body.querySelector('.woocommerce-breadcrumb').children;
  let category    = migaDePan[2].innerHTML || null;
  let subCategory = migaDePan[4].innerHTML || null;

  if(category && subCategory){
    let OSdevice;

    if(navigator.userAgent.includes('Android')) OSdevice='Android';
    else if ( navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) OSdevice="IOS";
    else OSdevice='DESK';

    /** Evento de visualización */
    dataLayer.push({
        event:'Evento de visualizacion Mudi',
        valorMudi:1,
        sku:skuMudi,
        categoria: category,
        subCategoria: subCategory,
        sistemaOperativo:OSdevice
    });

    /** Evento de intención de compra */
    document.querySelector('.single_add_to_cart_button').addEventListener('click',()=>{
        dataLayer.push({
            event:'Evento de intencion de compra Mudi',
            valorMudi:1,
            sku:skuMudi,
            categoria: category,
            subCategoria: subCategory,
            sistemaOperativo:OSdevice
        })
    },false);

    /** Evento de interación AR Mudi */
    document.getElementById('btnMudiAR').addEventListener('click',()=>{
        dataLayer.push({
            event:'Evento de interaccion AR Mudi',
            valorMudi:1,
            sku:skuMudi,
            categoria: category,
            subCategoria: subCategory,
            sistemaOperativo:OSdevice
        })
    },false);

    /** Evento de interación 3D Mudi */
    document.getElementById('btnMudi3D').addEventListener('click',()=>{
        dataLayer.push({
            event:'Evento de interaccion 3D Mudi',
            valorMudi:1,
            sku:skuMudi,
            categoria: category,
            subCategoria: subCategory,
            sistemaOperativo:OSdevice
        })
    },false);
  }

  else if(verifyCategories>1000){
    console.log('out Categories Mudi');
    return;
  }

  else { 
    verifyCategories++;
    requestAnimationFrame(sendDataLayer);
  }

};

// Función Main Mudi --
async function MudiExperience ({
  tokenApi,
  skuNumber,
  containerBtns,
  idCompanyMudi,
  color,

  zIndexBtns=1,
  zIndexModal=1,

  positionBtnsY='bottom',
}) {

  const server = await serverData( {token:tokenApi, sku:skuNumber} );
  if(server==undefined){ console.warn(`El producto identificado con el SKU: "%c${skuNumber}%c" en Mudi 3D&AR Commerce, no tiene 3D ni AR`, 'color: red; font-weight: bold', 'color: black;'); return };

  /** Una vez tengamos la respuesta positiva creamos los estilos generales y los botones */
  createStyles({idCompany:idCompanyMudi});
  createBtns({ father:containerBtns, sku:skuNumber, idCompany:idCompanyMudi, link3D:server.URL_WEB ,color:color, zBtns:zIndexBtns,zModal:zIndexModal, ButtonsY:positionBtnsY});
  sendDataLayer({sku:skuNumber})
};

/** verifyElementos Dom */
let timeVerify = 0;
function experienceON(){

  let skuNumberHome = document.querySelector('.sku_wrapper');
  let fatherContainer = document.querySelector('.product-gallery');

  if ( skuNumberHome && fatherContainer){
    MudiExperience({
      tokenApi:'oEXzKi59TKP6aUDH6Bba',
      skuNumber:document.querySelector('.sku').innerHTML,
      idCompanyMudi:315,
      color:'#325fa1',
      containerBtns:document.querySelector('.product-gallery'),
      zIndexModal:1000000,
    }) ;
  }

  else if(timeVerify > 1000){
    console.log('outMudi')
    return;
  }

  else{
    timeVerify ++;
    requestAnimationFrame(experienceON);
  }

};

/** Se inicia la experiencia Mudi */
experienceON();




/** --------------- identify flags  ------------------- */

let products = [
  "Camarote Erick Blanco",
  "Cama Multifuncional Berlín Blanco",
  "Cuna Cama Estela Rustico Blanco",
  "Clóset 6 Puertas 2 Cajones Valent Marrón",
  "Mueble Alacena Auxiliar de Cocina Kit Azalea"
];

let verifyTakeTitlesCards = 0;
/** Tomamos el titilos de las cards */
function takeTitlesCards(){
  let titleNodes = document.body.querySelectorAll('.woocommerce-LoopProduct-link.woocommerce-loop-product__link')

  if(titleNodes.length==0) {
    verifyTakeTitlesCards++
    requestAnimationFrame(takeTitlesCards);
  }
  else if(verifyTakeTitlesCards>1000){
    console.log('Mudi Flags Out')
    return
  }
  else{
    for(let i = 0 ; i<titleNodes.length; i++){
      recognizeProduct(titleNodes[i])
    }
  }
}

/**  reconocemos el nombre del producto*/
function recognizeProduct(node){
  
  let newNode     = node.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[0]
  let name        = newNode.getAttribute('aria-label')
  let product3D   = products.find(product => product==name);

  product3D && printIcon3D(newNode)

}

/** Rendizarmos las flags de Mudi */
let createStyleIconFlag = false
function printIcon3D(newNode){
  let cardBox = newNode.parentNode.parentNode;

  let fragment = document.createDocumentFragment();

  let div = document.createElement('DIV');
  div.classList.add('containerIconMudi');
  div.id='containerMudiIcon';
  div.innerHTML = `
    <svg id="img3DBtn" class="btnMudi3D" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360">
      <defs>
      </defs>
      <circle class="cls-2" cx="170" cy="178.45" r="150.5"></circle>
      <g id="vert3b-thumb">
          <path id="Shape" class="cls-1" d="m270.61,176.12c0-20.59-22.41-38-55.68-46.34-8.14-34.05-25.18-56.97-45.29-56.97s-37.14,22.96-45.3,57.04c-4.71,1.2-9.26,2.58-13.59,4.16-1.88.69-2.86,2.8-2.18,4.72.67,1.92,2.74,2.92,4.62,2.24,3.04-1.11,6.21-2.08,9.45-2.98-.41,2.27-.77,4.53-1.11,6.84h.19c-3.33,22.19-3.12,44.79.61,66.91h-.09c.15.81.28,1.65.43,2.49v.04c-27.7-7.79-46.71-22.1-46.72-38.07,0-8.41,5.43-16.79,15.41-24.01l-1.15,6.06h0c-.19.97,0,1.97.54,2.79.54.82,1.37,1.38,2.32,1.57h0c.23.05.46.07.69.07,1.72-.02,3.2-1.26,3.54-2.99l2.9-15.36h0c.18-.96-.01-1.95-.55-2.76-.53-.81-1.36-1.37-2.3-1.55h0l-15.07-3.11c-1.94-.41-3.85.84-4.3,2.82-.1.48-.1.98,0,1.46.26,1.46,1.35,2.63,2.77,2.95h.17l7.05,1.4c-12.44,8.79-19.31,19.49-19.31,30.6h0c0,20.59,22.41,38,55.68,46.35,8.16,34.04,25.18,56.96,45.29,56.96,11.18,0,21.93-7.46,30.61-20.88l.9,7.36c.24,2.02,2.04,3.46,4.01,3.22,1.98-.25,3.38-2.08,3.14-4.11h0l-1.82-15.54c-.11-.97-.6-1.86-1.35-2.46-.75-.61-1.71-.88-2.66-.76h0l-15.19,1.87c-1.97.25-3.38,2.09-3.14,4.1h0c.24,2.02,2.03,3.46,4.01,3.22l5.99-.74c-7.26,11.15-15.84,17.31-24.45,17.31-15.61,0-29.58-19.46-37.21-47.77,12.27,2.37,24.73,3.55,37.21,3.51,12.51.04,24.99-1.15,37.28-3.53-.89,3.31-1.82,6.56-2.91,9.66-.16.47-.23.96-.19,1.45.09,1.76,1.38,3.2,3.08,3.45s3.34-.77,3.91-2.43h0c1.54-4.43,2.89-9.09,4.07-13.91,33.31-8.35,55.75-25.76,55.75-46.35h0l-.03.03Zm-53.98,38.09c2.35-12.55,3.52-25.3,3.49-38.08h0c.04-12.77-1.11-25.51-3.43-38.06,27.69,7.8,46.7,22.1,46.71,38.07,0,15.97-19.05,30.27-46.76,38.07h0Zm-84.21-86.17c7.61-28.35,21.6-47.83,37.22-47.83s29.58,19.45,37.21,47.78c-1.12-.22-2.22-.41-3.34-.62v.14c-11.19-2.01-22.53-3.03-33.89-3.03-10.91.03-21.79,1-32.54,2.89l.07-.2c-1.57.28-3.15.57-4.73.88Zm76.36,8.03c2.77,13.16,4.15,26.6,4.12,40.06.04,13.45-1.31,26.88-4.05,40.04-12.89,2.84-26.04,4.26-39.22,4.22-13.16.04-26.29-1.38-39.15-4.21v-.15c-5.48-26.38-5.48-53.65,0-80.04,25.82-5.54,52.49-5.52,78.3.07h0Z"></path>
          <path id="Path" class="cls-3" d="m122.61,187.91c4.2,4.12,9.83,6.44,15.7,6.49,6.91,0,10.75-2.98,10.75-7.34,0-4.61-3.51-6.75-11.43-6.75-2.39,0-6.24,0-7.09.09v-10.59c1.02.08,4.86.08,7.09.08,6.31,0,10.5-2.05,10.5-6.31,0-4.52-4.61-6.83-10.58-6.83-5.43,0-10.65,2.14-14.51,5.97l-5.98-7.51c5.57-6.07,13.53-9.38,21.76-9.06,13.31,0,21.51,5.97,21.51,15.44-.45,6.78-5.7,12.26-12.46,12.98,7.27.48,13.01,6.37,13.31,13.65,0,9.81-8.79,16.73-22.44,16.73-8.47.46-16.7-2.88-22.45-9.12l6.32-7.94Z"></path>
          <path id="Shape-2" class="cls-3" d="m170.32,147.04h22.45c17.83,0,30.21,11.35,30.21,28.51s-12.38,28.42-30.21,28.42h-22.45v-56.93Zm22.45,46.26c4.78.23,9.44-1.56,12.84-4.94,3.39-3.38,5.21-8.03,4.99-12.81.36-4.83-1.41-9.58-4.83-13-3.42-3.43-8.17-5.19-13-4.84h-10.33v35.59h10.33Z"></path>
      </g>
    </svg>
  `;

  fragment.appendChild(div);

  if (!createStyleIconFlag) {createStyleIcon3D(); createStyleIconFlag = !createStyleIconFlag}
  cardBox.appendChild(fragment);

};

/** Creamos el estilo */
function createStyleIcon3D(){
  let style = document.createElement('STYLE')
  style.innerHTML=`

      .containerIconMudi{
        position: absolute;
        top: -5px;
        z-index: 100;
        right: -10px;
      }

      .btnMudi3D{
        width:70px
      }

      .cls-1{
          fill:#03457c;
          opacity:.6;
      }
      
      .cls-1,.cls-2,.cls-3{
          stroke-width:0px;
      }
      .cls-2{
          fill:#f4f4f4;
      }
      .cls-3{
          fill:#03457c;
      }

      @media screen and (max-width:500px){
        .containerIconMudi{
          position: absolute;
          top: -3px;
          z-index: 100;
          right: -5px;
        }

        .btnMudi3D{
          width:50px
        }
      }

  `
  document.body.appendChild(style)
}

takeTitlesCards()

