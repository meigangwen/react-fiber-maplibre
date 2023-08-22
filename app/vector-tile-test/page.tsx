import VectorTileLoader from "./VectorTileLoader";

export default function Home() {

  return (
    <>
      <h1 className="text-white">Vector tile loader test</h1>
      <VectorTileLoader url="https://tileserver.yilumi.com/data/singapore/14/12914/8132.pbf" />
    </>
  )
}