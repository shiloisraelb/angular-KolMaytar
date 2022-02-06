export interface Custumer {
    //custumer information
    custumerID :string;
    name :string;   
    email:string;    
    orders :Orders[]|null;
    pasWord:string;
}
export interface Orders{
    //order information
    custumer :Custumer|null;
    prodactbandName : string;
    date:string;
    custumerAddres:string;
    
}
export interface tabls{
    //order+prodact information
    date:string;
    band:string;
    adres:string;
    url:string;
}
export interface ewdingBand{
    //youtyoub nand information
    url:string;
    bendData:string;
}
export interface Prodacts{
    //Prodact information
    order :Orders|null|string;
    bandName:string;
    conectionNumber :number;
    instrument:string;
    link:string;
}
export interface Students
{
    //Studentt information
    studentID:string;
    date:string;
    name :string;
    instrument :string;
}
export interface ComStat
{
    //component information
    compName:string;
    stat:boolean;
}