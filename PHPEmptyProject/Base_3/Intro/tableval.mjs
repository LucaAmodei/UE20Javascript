export {TableVal};

class TableVal {
    constructor(...valeurs){
        this.tab = valeurs;
    }
    get total(){
        return this.tab.reduce((s,x) => s+x);
    }

    isEmpty(){
        return this.tab.length === 0;
    }
}