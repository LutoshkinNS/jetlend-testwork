import { test, expect } from "@playwright/test";

test.describe("ConfirmAction", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("страница загружается, кнопка «Выполнить действие» видна", async ({
    page,
  }) => {
    await expect(
      page.getByRole("button", { name: "Выполнить действие" }),
    ).toBeVisible();
  });

  test("клик открывает диалог с заголовком «Согласие с правилами»", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Выполнить действие" }).click();

    await expect(page.getByText("Согласие с правилами")).toBeVisible();
  });

  test("кнопка «Подтвердить» заблокирована сразу после открытия", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Выполнить действие" }).click();

    const confirmButton = page.getByRole("button", {
      name: /Подтвердить \(\d+\)/,
    });
    await expect(confirmButton).toBeDisabled();
  });

  test("после 5 секунд кнопка «Подтвердить» становится активной", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Выполнить действие" }).click();

    const confirmButton = page.getByRole("button", {
      name: "Подтвердить",
      exact: true,
    });
    await expect(confirmButton).toBeEnabled({ timeout: 10000 });
  });

  test("клик «Отмена» закрывает диалог, алерт не появляется", async ({
    page,
  }) => {
    let alertAppeared = false;
    page.on("dialog", async (dialog) => {
      alertAppeared = true;
      await dialog.dismiss();
    });

    await page.getByRole("button", { name: "Выполнить действие" }).click();
    await page.getByRole("button", { name: "Отмена" }).click();

    await expect(page.getByRole("dialog")).not.toBeVisible();
    expect(alertAppeared).toBe(false);
  });

  test("полный флоу: открыть → дождаться → подтвердить → алерт «Действие выполнено»", async ({
    page,
  }) => {
    let alertMessage = "";
    page.on("dialog", async (dialog) => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    await page.getByRole("button", { name: "Выполнить действие" }).click();

    const confirmButton = page.getByRole("button", {
      name: "Подтвердить",
      exact: true,
    });
    await expect(confirmButton).toBeEnabled({ timeout: 10000 });
    await confirmButton.click();

    expect(alertMessage).toBe("Действие выполнено");
  });

  test("после подтверждения повторный клик вызывает алерт сразу (без диалога)", async ({
    page,
  }) => {
    const alertMessages: string[] = [];
    page.on("dialog", async (dialog) => {
      alertMessages.push(dialog.message());
      await dialog.accept();
    });

    await page.getByRole("button", { name: "Выполнить действие" }).click();

    const confirmButton = page.getByRole("button", {
      name: "Подтвердить",
      exact: true,
    });
    await expect(confirmButton).toBeEnabled({ timeout: 10000 });
    await confirmButton.click();

    await page.getByRole("button", { name: "Выполнить действие" }).click();

    expect(alertMessages).toEqual(["Действие выполнено", "Действие выполнено"]);
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
});
