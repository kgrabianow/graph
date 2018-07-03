/**
 * Siatka "skalująca" na canvasie
 */
function Web(width, height) {
    // Parametry siatki
    this.width = width;
    this.height = height;

    this.startX = 0;
    this.startY = 0;

    this.sizeXmod = 1;
    this.sizeYmod = 1;

    this.dx = 0;
    this.dy = 0;

    this.interval = 50;

    // określa widoczność siatki
    this.webVisible = false;
}

Web.prototype.switchVisibility = function(){
    this.webVisible = !this.webVisible;
}

Web.prototype.setWidth = function(width){
    this.width = width;
}

Web.prototype.setHeight = function(height){
    this.height = height;
}

Web.prototype.setInterval= function(interval){
    this.interval = interval;
}

Web.prototype.draw = function (ctx) {
    // Warunek czy rysować siatkę?
    if( this.webVisible ==  true ){

        ctx.beginPath();

        // parametry linii
        ctx.fillStyle = "grey";
        ctx.strokeStyle = "silver";
        ctx.lineWidth = 1;

        // Pionowe linie
        for(var i=0; i<=(this.width/this.interval); i++){

            // czcionka
            ctx.font = "10pt Times New Roman";
            // ( tekst_do_napisania, x, y )
            if( i > 0 ){
                ctx.fillText( (i*this.interval).toString(), this.startX + this.interval*i + 5, 15 );
            }

            // współrzędne początku i końca
            ctx.moveTo(this.startX + this.interval*i, this.startY + 0);
            ctx.lineTo(this.startX + this.interval*i, this.startY + this.height);
            ctx.stroke();
        }

        // Poziome linie
        for(var i=0; i<=(this.height/this.interval); i++){

            // czcionka
            ctx.font = "10pt Times New Roman";
            // ( tekst_do_napisania, x, y )
            if( i > 0 ){
                ctx.fillText( (i*this.interval).toString(), 5, this.startY + this.interval*i -5);
            }

            // współrzędne początku i końca
            ctx.moveTo(this.startX + 0, this.startY + this.interval*i);
            ctx.lineTo(this.startX + this.width, this.startY + this.interval*i);
            ctx.stroke();
        }

        ctx.closePath();
    }
}

Web.prototype.drawMap = function (ctx) {
    // Warunek czy rysować siatkę?
    if( this.webVisible ==  true ){

        ctx.beginPath();

        // parametry linii
        ctx.fillStyle = "grey";
        ctx.strokeStyle = "silver";
        ctx.lineWidth = 1;

        // Pionowe linie
        for(var i=0; i<=(this.width/this.interval); i++){

            // czcionka
            ctx.font = "10pt Times New Roman";
            // ( tekst_do_napisania, x, y )
            if( i > 0 ){
                ctx.fillText( (i*this.interval).toString(), 0 + this.interval*i + 5, 15 );
            }

            // współrzędne początku i końca
            ctx.moveTo(0 + this.interval*i, 0 + 0);
            ctx.lineTo(0 + this.interval*i, 0 + this.height);
            ctx.stroke();
        }

        // Poziome linie
        for(var i=0; i<=(this.height/this.interval); i++){

            // czcionka
            ctx.font = "10pt Times New Roman";
            // ( tekst_do_napisania, x, y )
            if( i > 0 ){
                ctx.fillText( (i*this.interval).toString(), 5, 0 + this.interval*i -5);
            }

            // współrzędne początku i końca
            ctx.moveTo(0 + 0, 0 + this.interval*i);
            ctx.lineTo(0 + this.width, 0 + this.interval*i);
            ctx.stroke();
        }

        ctx.closePath();
    }
}

// pod-przestrzeń nazw
GRAPH.web = new Web( 1400, 800 );