import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Helmet } from "react-helmet-async";
import { ScrollArea, Button } from "@reactive-resume/ui";
import { Pencil, Trash, DotsThree } from "@phosphor-icons/react";

export const TemplatesPage = () => {
  const { i18n } = useLingui();

  // Mock template data - replace with actual data
  const templates = [
    {
      id: 1,
      name: "Resume 1",
      thumbnail: "/templates/jpg/cv_template_1.jpg",
      createdAt: "2024-01-15",
      status: "Active",
    },
    {
      id: 2, 
      name: "Resume 2",
      thumbnail: "/templates/jpg/cv_template_2.jpg",
      createdAt: "2024-01-16",
      status: "Active",
    },
    {
      id: 3,
      name: "Resume 3", 
      thumbnail: "/templates/jpg/cv_template_3.jpg",
      createdAt: "2024-01-17",
      status: "Active",
    },
    {
      id: 4,
      name: "Resume 4",
      thumbnail: "/templates/jpg/cv_template_4.jpg", 
      createdAt: "2024-01-18",
      status: "Active",
    },
    {
        id: 5,
        name: "Resume 4",
        thumbnail: "/templates/jpg/cv_template_5.jpg", 
        createdAt: "2024-01-18",
        status: "Active",
      },
      {
        id: 6,
        name: "Resume 4",
        thumbnail: "/templates/jpg/cv_template_6.jpg", 
        createdAt: "2024-01-18",
        status: "Active",
      }
  ];

  return (
    <ScrollArea orientation="vertical" className="h-screen">
      <Helmet prioritizeSeoTags>
        <html lang={i18n.locale} />
        <title>{t`Templates`} - {t`Reactive Resume`}</title>
      </Helmet>

      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-primary">{t`Resume Templates`}</h2>
            <p className="text-primary/70 mt-2">{t`Manage and customize resume templates for your users`}</p>
          </div>
          {/* <Button variant="outline">{t`Add New Template`}</Button> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-primary/5 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1 max-w-[280px] mx-auto">
              <div className="aspect-[210/297] relative">
                <img 
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white text-red-600">
                    <Trash className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
                    <DotsThree className="w-4 h-4" weight="bold" />
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-primary">{template.name}</h3>
                <p className="text-sm text-primary/70">{t`Created`}: {template.createdAt}</p>
                <div className="mt-2">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {template.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default TemplatesPage;

