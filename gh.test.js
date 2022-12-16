let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Where the world builds software · GitHub");
  }, 7000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 7000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  }, 7000);
});

describe("Add new tests", () => {
  //Добавляем строку с новыми тестами. С помощью метода describe() можно оформить тесты в связанные группы. Например, тесты по одному модулю будут составлять одну группу, а тесты другого модуля будут оформлять соответственно другую группу. Разбиение на группы позволит легко идентифицировать, для какого модуля или группы не прошел тест, особенно если тестов очень много.

  test("Tab Marketplace", async () => {
    //Пишем тесты через асинхронную функцию
    await page.goto("https://github.com/marketplace"); //await page.goto = переход на сайт https://github.com/marketplace и ожидание его полной загрузки
    const title = await page.title(); //ждем загрузку заголовка страницы
    expect(title).toContain("Find tools to improve your workflow"); //expect(title) = Проверяем заголовок .toContain = должен содержать в себе текст "Find tools to improve your workflow"
  }, 60000); //таймаут
  //Если такой текст в заголовке есть - тест проходит успешно, если нет - выпадает в ошибку.

  test("Text under h1", async () => {
    await page.goto(
      "https://github.com/marketplace?category=&query=&type=apps&verification="
    );
    await page.waitForSelector("h1"); //Под селектором h1 обычно лежит заголовок страницы, нужен для подтверждения её загрузки.
    const title2 = await page.title();
    expect(title2).toEqual(
      //Проверяем равенство, в нашем случае соответствие названия строки, аналог булева значения.
      "Build on your workflow with apps that integrate with GitHub."
    );
  }, 60000);

  test("The home for developer communities", async () => {
    await page.goto("https://github.com/features/discussions");
    await page.waitForSelector("h1");
    const title3 = await page.title();
    expect(title3).toEqual(
      "GitHub Discussions · The home for developer communities · GitHub"
    );
  }, 60000);
});
