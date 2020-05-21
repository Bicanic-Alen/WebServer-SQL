
export class Icon { //Classe per medoficare la scala delle icone
    public scaledSize:ScaledSize;
    constructor(public url: string, size: number){
        this.scaledSize = new ScaledSize(size,size);
    }

    setSize(size: number) { //setta il size
        this.scaledSize = new ScaledSize(size,size);
    }
}

export class ScaledSize { // definisce  h e w della icona
    constructor(
    public width:  number,
    public height: number){}
}
