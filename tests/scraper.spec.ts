import { fetchTask } from "../src/scraper";

describe("scraper", () => {
  describe("fetchTask", () => {
    it("loads proper demo task", async () => {
      const response = await fetchTask();

      expect(response).toMatchObject({
        url: "https://seekingalpha.com/symbol/MPLX/dividends/scorecard",
      });
    });
  });
});
