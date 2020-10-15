
export class Convocatory{
  constructor(
    public _id: string,
    public titulo: string,
    public fecha_invitacion: Date,
    public fecha_presentacion: Date,
    public fecha_ampliacion: Date,
    public fecha_consultas: Date,
    public estado: string,
    public correo: string

  ){}
}

