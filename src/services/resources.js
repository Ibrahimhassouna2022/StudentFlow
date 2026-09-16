import apiFetch from "@/lib/helper";
export default  function getResources(){
   return apiFetch("https://dev.to/api/articles?tag=webdev&per_page=6");
}