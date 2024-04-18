interface Props {
    text: String;
    split: any;
}

const countWords = (text: Props) => {
    return text.split(" ").length;
  };

  const useEstimateReadingTime = (editorjsContentString: string, wpm = 100) => {
    const blocks = JSON.parse(editorjsContentString).blocks;
    let totalWords = 0;

    blocks.forEach((block: any) => {
      if (block.type === "paragraph" || block.type === "header") {
        totalWords += countWords(block.data.text);
      } else if (block.type === "list") {
        block.data.items.forEach((item: any) => {
          totalWords += countWords(item);
        });
      }
    });

    return Math.ceil(totalWords / wpm);
  };

  export default useEstimateReadingTime;