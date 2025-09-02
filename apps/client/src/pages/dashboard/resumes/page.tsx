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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const { resumes, loading, pagination } = useResumes(currentPage, itemsPerPage);
  const navigate = useNavigate();

  console.log(pagination,"pagination")
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(()=>{
    queryClient.invalidateQueries({ queryKey: ["resumes"] });
  },[currentPage, itemsPerPage])

  // Remove the problematic useEffect that was causing infinite loop
  // The query will automatically refetch when currentPage or itemsPerPage changes


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
            <Button className="bg-[#D6EF3C]/90 text-black px-4 py-2 rounded-full font-semibold hover:bg-[#D6EF3C]/90"
              onClick={() => navigate('/onboard/select-template?create-new-resume')}
            >
              <Plus className="mr-2" />
              Create New Resume
            </Button>
          </div>
        </div>

        <ScrollArea
          allowOverflow
          className="min-h-[calc(100vh-140px)] overflow-visible lg:min-h-[calc(100vh-88px)]"
        >
           <TabsContent value="list">
            <ListView 
              resumes={resumes || []} 
              loading={loading} 
              pagination={pagination}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </TabsContent>
        <TabsContent value="grid">
            <GridView 
              resumes={resumes} 
              loading={loading} 
              pagination={pagination}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </TabsContent>
       
          
        </ScrollArea>
      </Tabs>
      
    </>
  );
};
