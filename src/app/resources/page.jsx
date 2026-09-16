
import CardResources from "@/components/resources/CardResources"
import getResources from "@/services/resources";
// Resources page: Server Component fetching curated web development articles from Dev.to API
export default async function Page(){
      const articles = await getResources();

  return (
    <div className="flex  flex-col gap-4">
            <div className="flex flex-col gap-4 ">
                <h1 className="font-extrabold text-3xl  ">Learning Resources & Articles</h1>
                <p className="text-sm ">Curated web development articles fetched from our internal API route.</p>
            </div>
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             {articles.map((article) => (
          <CardResources
            key={article.id}
            title={article.title}
            description={article.description}
            tag={article.tag_list[0]}
            minutes={article.reading_time_minutes}
            author={article.user.name}
            url={article.url}
          />
        ))}
           </div>
         
    </div>
 );
}