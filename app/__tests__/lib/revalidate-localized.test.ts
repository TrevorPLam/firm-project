import { describe, it, expect, vi, beforeEach } from "vitest";
import { revalidatePath } from "next/cache";
import { revalidateLocalizedPath } from "@/lib/revalidate-localized";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("revalidateLocalizedPath", () => {
  beforeEach(() => {
    vi.mocked(revalidatePath).mockClear();
  });

  it("should call revalidatePath for each configured locale", () => {
    revalidateLocalizedPath("/contact");

    expect(revalidatePath).toHaveBeenCalledWith("/en/contact");
    expect(revalidatePath).toHaveBeenCalledWith("/es/contact");
  });

  it("should call revalidatePath with correct locale prefix for blog", () => {
    revalidateLocalizedPath("/blog");

    expect(revalidatePath).toHaveBeenCalledWith("/en/blog");
    expect(revalidatePath).toHaveBeenCalledWith("/es/blog");
  });

  it("should call revalidatePath with correct locale prefix for root path", () => {
    revalidateLocalizedPath("/");

    expect(revalidatePath).toHaveBeenCalledWith("/en/");
    expect(revalidatePath).toHaveBeenCalledWith("/es/");
  });

  it("should call revalidatePath for all locales when routing has multiple locales", () => {
    revalidateLocalizedPath("/about");

    expect(revalidatePath).toHaveBeenCalledTimes(2);
    expect(revalidatePath).toHaveBeenCalledWith("/en/about");
    expect(revalidatePath).toHaveBeenCalledWith("/es/about");
  });
});
