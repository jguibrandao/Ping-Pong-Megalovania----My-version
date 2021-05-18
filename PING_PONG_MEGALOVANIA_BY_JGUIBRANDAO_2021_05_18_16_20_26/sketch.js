//tamanho da bolinha
var xBolinha = 300;
var yBolinha = 200;
var diametroBolinha = 13;
var raioBolinha = diametroBolinha/2;

//velocidade jogo
var velocidadeXBolinha = 6;
var velocidadeYBolinha = 6; 

//raquete 1
var xRaquete = 5;
var yRaquete = 150;
var larguraRaquetes = 10;
var alturaRaquetes = 90;
var colidiu = false;

//raquete 2
var xRaquete2 = 585;
var yRaquete2 = 150;
var velocidadeYRaquete2;

//placar 
var meusPontos = 0;
var pontos2 = 0;

//sons
var raquetada;
var ponto;
var musicaFundo;

function preload() {
  
  musicaFundo = loadSound("musica_d_fundo.mp3");
  ponto = loadSound("som_ponto.mp3");
  raquetada = loadSound("som_tacada.mp3");
} 

function setup() {
  
  createCanvas(600, 400);
  musicaFundo.loop();
}

function draw() {
  
  background(0);
  
  mostraBolinha();
  
  mostraRaquete(xRaquete, yRaquete);
  
  mostraRaquete(xRaquete2, yRaquete2);
  
  movimentaBolinha();
  
  moveMinhaRaquete();
  
  moveRaquete2();
  
  determinaSentido();
  
  //verificaColisaoComRaquete();
  
  verificaColisaoComRaqueteBiblio(xRaquete, yRaquete);
  verificaColisaoComRaqueteBiblio(xRaquete2, yRaquete2);
  
  incluiPlacar();
  
  marcaPonto(); 
}


function mostraBolinha() {
  
  circle(xBolinha, yBolinha, diametroBolinha);
}

function mostraRaquete(x, y) {
  
    rect(x, y, larguraRaquetes, alturaRaquetes);
}


function movimentaBolinha() {
  
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}


function determinaSentido() {
  
  if(xBolinha > width - raioBolinha || xBolinha < 0 + raioBolinha) {
    velocidadeXBolinha *= -1;
  }
  
  if(yBolinha > height - raioBolinha || yBolinha < 0 + raioBolinha) {
    velocidadeYBolinha *= -1;
  }  
}

function moveMinhaRaquete() {
  
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  
  if(keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function moveRaquete2 () {
  
  velocidadeYRaquete2 = yBolinha - yRaquete2 - larguraRaquetes / 2 - 30;

  yRaquete2 += velocidadeYRaquete2;
}

function verificaColisaoComRaquete() {
  
    if(xBolinha - raioBolinha < xRaquete + larguraRaquetes && yBolinha - raioBolinha < yRaquete + alturaRaquetes && yBolinha + raioBolinha > yRaquete)   {
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoComRaqueteBiblio(x, y) {
    colidiu = collideRectCircle(x, y, larguraRaquetes, alturaRaquetes, xBolinha, yBolinha, raioBolinha);
    if (colidiu){
      velocidadeXBolinha *= -1;
      raquetada.play();
    }
}

function incluiPlacar() {
  
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(191, 10, 40, 20);
  rect(340, 10, 40, 20);
  fill(255);
  text(meusPontos, 211, 26);
  text(pontos2, 360, 26);
}

function marcaPonto() {
  
  if(xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  
  if(xBolinha < 10) {
    
    pontos2 += 1;
    ponto.play();
  }
}


