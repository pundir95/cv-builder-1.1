import { t } from "@lingui/macro";
import { List, SquaresFour, Plus } from "@phosphor-icons/react";
import { ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger, Button } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";

import { GridView } from "./_layouts/grid";
import { ListView } from "./_layouts/list";
import { useResumes } from "@/client/services/resume";
import { LimitReachedModal } from "../../select-template/LimitReachedModal";
import { queryClient } from "@/client/libs/query-client";

type Layout = "grid" | "list";

export const ResumesPage = () => {
  const [layout, setLayout] = useState<Layout>("list");
  const { resumes, loading } = useResumes();
  const navigate = useNavigate();


  useEffect(()=>{
    queryClient.invalidateQueries({ queryKey: ["resumes"] });
  },[resumes])


  return (
    <>
      <Helmet>
        <title>
           Cv Builder
        </title>
      </Helmet>

      <Tabs
        value={layout}
        className="space-y-4"
        onValueChange={(value) => {
          setLayout(value as Layout);
        }}
      >
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold tracking-tight"
          >
            {t`Resumes`}
          </motion.h1>

          <div className="flex items-center justify-between">
            <TabsList>
            <TabsTrigger value="list" className="size-8 p-0 sm:h-8 sm:w-auto sm:px-4">
                <List />
                <span className="ml-2 hidden sm:block">{t`List`}</span>
              </TabsTrigger>
              <TabsTrigger value="grid" className="size-8 p-0 sm:h-8 sm:w-auto sm:px-4">
                <SquaresFour />
                <span className="ml-2 hidden sm:block">{t`Grid`}</span>
              </TabsTrigger>
              
            </TabsList>
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => navigate('/onboard/experience-level')}
            >
              <Plus className="mr-2" />
              Create New Resume
            </Button>
          </div>
        </div>

        <ScrollArea
          allowOverflow
          className="h-[calc(100vh-140px)] overflow-visible lg:h-[calc(100vh-88px)]"
        >
           <TabsContent value="list">
            <ListView resumes={resumes || []} loading={loading} />
          </TabsContent>
        <TabsContent value="grid">
            <GridView resumes={resumes} loading={loading} />
          </TabsContent>
       
          
        </ScrollArea>
      </Tabs>
      
    </>
  );
};
