import { test, expect } from "@playwright/test";

const API_PATH = "/media/files/hr/frontend";

const MOCK_DATA = {
  projects: {
    status: "ok",
    data: [{ id: 1, name: "Alpha", code: "ALF" }],
  },
  users: {
    status: "ok",
    data: [{ id: 10, name: "Alice" }],
  },
  tasks: {
    status: "ok",
    data: [
      {
        id: 1,
        name: "Задача 1",
        project_id: 1,
        estimate: 5,
        responsible_id: 10,
      },
    ],
  },
};

test.describe("UserTasks", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("отображается только кнопка, данные не загружены", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Загрузить данные" }),
    ).toBeVisible();
    await expect(page.getByText("Загрузка...")).not.toBeVisible();
    await expect(page.getByText("Нет данных")).not.toBeVisible();
  });

  test("после клика отображаются данные", async ({ page }) => {
    await page.route(`**${API_PATH}/projects.json`, (route) =>
      route.fulfill({ json: MOCK_DATA.projects }),
    );
    await page.route(`**${API_PATH}/users.json`, (route) =>
      route.fulfill({ json: MOCK_DATA.users }),
    );
    await page.route(`**${API_PATH}/tasks.json`, (route) =>
      route.fulfill({ json: MOCK_DATA.tasks }),
    );

    await page.getByRole("button", { name: "Загрузить данные" }).click();

    await expect(page.getByText("Alice")).toBeVisible();
    await expect(page.getByText("Задача 1")).toBeVisible();
  });

  test("после клика при пустом ответе отображается «Нет данных»", async ({
    page,
  }) => {
    await page.route(`**${API_PATH}/projects.json`, (route) =>
      route.fulfill({ json: { status: "ok", data: [] } }),
    );
    await page.route(`**${API_PATH}/users.json`, (route) =>
      route.fulfill({ json: { status: "ok", data: [] } }),
    );
    await page.route(`**${API_PATH}/tasks.json`, (route) =>
      route.fulfill({ json: { status: "ok", data: [] } }),
    );

    await page.getByRole("button", { name: "Загрузить данные" }).click();

    await expect(page.getByText("Нет данных")).toBeVisible();
  });

  test("после клика при ошибке сети отображается сообщение об ошибке", async ({
    page,
  }) => {
    await page.route(`**${API_PATH}/**`, (route) =>
      route.abort("failed"),
    );

    await page.getByRole("button", { name: "Загрузить данные" }).click();

    await expect(page.getByText(/Ошибка/)).toBeVisible();
  });
});