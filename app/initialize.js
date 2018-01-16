import $ from "jquery"
import fullpage from 'fullpage.js'
import autocomplete from 'jquery-autocomplete'


// canvas

var c1 = document.getElementById( 'c1' ),
	ctx1 = c1.getContext( '2d' ),
	c2 = document.getElementById( 'c2' ),
	ctx2 = c2.getContext( '2d' ),
	twopi = Math.PI * 2,
	parts = [],
	sizeBase,
	opt,
	hue,
	count;

var cw;
var ch;

function rand( min, max ) {
	return Math.random() * ( max - min ) + min;
}

function hsla( h, s, l, a ) {
	return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
}

function create() {
	sizeBase = cw + ch;
	count = Math.floor( sizeBase * 0.3 ),
	hue = 180,
	opt = {
		radiusMin: 1,
		radiusMax: sizeBase * 0.04 * 2,
		blurMin: 10,
		blurMax: sizeBase * 0.04 * 4,
		hueMin: hue,
		hueMax: hue + 40,
		saturationMin: 20,
		saturationMax: 50,
		lightnessMin: 20,
		lightnessMax: 30,
		alphaMin: 0.2,
		alphaMax: 0.3
	}
	ctx1.clearRect( 0, 0, cw, ch );
	ctx1.globalCompositeOperation = 'lighter';
	while( count-- ) {
		var radius = rand( opt.radiusMin, opt.radiusMax ),
			blur = rand( opt.blurMin, opt.blurMax ),
			x = rand( 0, cw ),
			y = rand( 0, ch ),
			hue = rand(opt.hueMin, opt.hueMax ),
			saturation = rand( opt.saturationMin, opt.saturationMax ),
			lightness = rand(  opt.lightnessMin, opt.lightnessMax ),
			alpha = rand( opt.alphaMin, opt.alphaMax );


		ctx1.shadowColor = hsla( hue, saturation, lightness, alpha );
		ctx1.shadowBlur = blur;
		ctx1.beginPath();
		ctx1.arc( x, y, radius, 0, twopi );
		ctx1.closePath();
		ctx1.fill();
	}

	parts.length = 0;
	for( var i = 0; i < Math.floor( ( cw + ch ) * 0.03 ); i++ ) {
		parts.push({
			radius: rand( 1, sizeBase * 0.03 ),
			x: rand( 0, cw ),
			y: rand( 0, ch ),
			angle: rand( 0, twopi ),
			vel: rand( 0.1, 0.5 ),
			tick: rand( 0, 10000 )
		});
	}
}

function init() {
	resize();
	create();
	loop();
}

function loop() {
	requestAnimationFrame( loop );

	ctx2.clearRect( 0, 0, cw, ch );
	ctx2.globalCompositeOperation = 'source-over';
	ctx2.shadowBlur = 0;
	ctx2.drawImage( c1, 0, 0 );
	ctx2.globalCompositeOperation = 'lighter';

	var i = parts.length;
	ctx2.shadowBlur = 10;
	ctx2.shadowColor = '#fff';
	while( i-- ) {
		var part = parts[ i ];

		part.x += Math.cos( part.angle ) * part.vel;
		part.y += Math.sin( part.angle ) * part.vel;
		part.angle += rand( -0.05, 0.05 );

		ctx2.beginPath();
		ctx2.arc( part.x, part.y, part.radius, 0, twopi );
		ctx2.fillStyle = hsla( 0, 0, 100, 0.075 + Math.cos( part.tick * 0.02 ) * 0.05 );
		ctx2.fill();

		if( part.x - part.radius > cw ) { part.x = -part.radius }
		if( part.x + part.radius < 0 )  { part.x = cw + part.radius }
		if( part.y - part.radius > ch ) { part.y = -part.radius }
		if( part.y + part.radius < 0 )  { part.y = ch + part.radius }

		part.tick++;
	}
}

function resize() {
	cw = c1.width = c2.width = window.innerWidth,
	ch = c1.height = c2.height = window.innerHeight;
	create();
}

function click() {
	create()
}

window.addEventListener( 'resize', resize );
window.addEventListener( 'click', click );

init();

// fullpage

$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors:['page-1','page-2', 'page-3', 'page-4', 'page-5', 'page-6'],
    menu: '#menu',
    navigation: true
  });
});


// next code

$('.container').click(function(evt) {
  evt.stopPropagation();
})

$('.filter').click(function(evt) {
  evt.stopPropagation();
})

$('.main-nav-overlay').click(function(evt) {
  evt.stopPropagation();
})

$('#fullpage').click(function(evt) {
  evt.stopPropagation();
})

$('.popup').click(function(evt) {
  evt.stopPropagation();
})

$("#navToggle").click(function(evt) {
  evt.stopPropagation();
  $(this).toggleClass("active");
  $(".main-nav-overlay").toggleClass("open");
  $("body").toggleClass("locked");
});

var formButton = $('.seating__button');
var popupButtonClose = $('.popup-close');

formButton.click(function(evt) {
  evt.preventDefault();
  $('.popup').addClass('open-popup');
});

popupButtonClose.click(function() {
  $('.popup').removeClass('open-popup');
})

$('.popup-overlay').click(function(evt) {
    if ($(evt.target).closest('.popup-container').length == 0) {
    $('.popup').removeClass('open-popup');
  }
});


// autocomplete

var states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina',
  'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
  'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

jQuery(".seating__input").autocomplete({
  source:[states],
  limit: 6
});


