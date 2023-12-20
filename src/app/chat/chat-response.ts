export interface ChatResponse {

   created:number;
   data:Data[]
  }

export interface Data{
  revised_prompt:string;
  url:string

}
