import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const SortSelector = ({ onSortChange }: { onSortChange: (value: string) => void }) => {
  return (
    <div className="mb-6">
      <Tabs defaultValue="new" onValueChange={onSortChange} className="wonky-border p-2 bg-white inline-block">
        <TabsList className="grid grid-cols-2 w-[300px]">
          <TabsTrigger value="new" className="font-bold wonky-border data-[state=active]:bg-black data-[state=active]:text-white">
            Новые
          </TabsTrigger>
          <TabsTrigger value="popular" className="font-bold wonky-border data-[state=active]:bg-black data-[state=active]:text-white">
            Популярные
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default SortSelector;
