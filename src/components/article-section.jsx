import ArticleCard from "./medicincard";

const ArticlesSection = () => {
  const articles = [
    {
    
      title: "Medicines",
      imageUrl: "/asset/article/Medicines_1.webp",
    },
    {
      
      title: "babyChild",
      imageUrl: "/asset/article/Baby_Child.webp",
    },
    {
        
        title: "Electronics",
        imageUrl: "/asset/article/Electronics.webp",
      },
      {
       
        title: "Supplements",
        imageUrl: "/asset/article/Vitamins-_-Supplements.webp",
      },
      {
        
        title: "SkinCare",
        imageUrl: "/asset/article/Skin-Care.webp",
      },
  ];

  return (
    <div className="flex flex-wrap justify-center bg-primary py-12 gap-5">
      {articles.map((article, index) => (
        <ArticleCard
          key={index}
          date={article.date}
          title={article.title}
          imageUrl={article.imageUrl}
        />
      ))}
    </div>
  );
};

export default ArticlesSection;
