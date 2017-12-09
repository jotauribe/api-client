/**
 * Created by Jota Uribe on 8/12/2017.
 */
export class LogItem {
  public cd_cebroker_state: string;              //FL
  public pro_cde: string;                        //1701
  public cd_profession: string;                  //RN
​ ​ ​public id_license: number;                     //99999
  public dt_end: string;                         //2020-04-30T00:00:00
  public cd_environment: string;​                 //​PRIMARY
  public dt_Start_Log: string;                   //2017-08-03T19:26:13.89923
  public ds_compl_status_returned: string; ​      //IN_PROG
​ ​ ​public dt_end_log: string;                     //2017-08-03T19:26:14.347996
​ ​ ​public cd_machine: string;                     //​JAX00
​ ​ ​public id_client_nbr: number;                  //1


  constructor(cd_cebroker_state: string,
              pro_cde: string,
              cd_profession: string,
              id_license: number,
              dt_end: string,
              cd_environment: string,
              dt_Start_Log: string,
              ds_compl_status_returned: string,
              dt_end_log: string,
              cd_machine: string,
              id_client_nbr: number) {
    this.cd_cebroker_state = cd_cebroker_state;
    this.pro_cde = pro_cde;
    this.cd_profession = cd_profession;
    this.id_license = id_license;
    this.dt_end = dt_end;
    this.cd_environment = cd_environment;
    this.dt_Start_Log = dt_Start_Log;
    this.ds_compl_status_returned = ds_compl_status_returned;
    this.dt_end_log = dt_end_log;
    this.cd_machine = cd_machine;
    this.id_client_nbr = id_client_nbr;
  }
}
