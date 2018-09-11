export interface TodoInterface {
    
    
    /**
     * @var (optional) id:number
     * Identifiant du todo
     */
    id?: number;
    /**
     * Titre du Todo
     * @var String
     */
    title: String;

    /**
     * Date de début pour le todo 
     * @var Date begin
     */
    begin: Date;
 /**
     * Date de fin pour le todo 
     *  @var Date end
     */
    end: Date;
/**
 * 
 *  Vrai si la case est cochée
 */
   
    isChecked?: boolean;
}
