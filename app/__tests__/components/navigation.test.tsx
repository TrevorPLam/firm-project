import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navigation } from "@/components/navigation";

describe("Navigation", () => {
  describe("Mobile menu keyboard accessibility", () => {
    it("should close menu when Escape is pressed and return focus to toggle button", async () => {
      const user = userEvent.setup();
      render(<Navigation />);

      // Find and click the mobile menu toggle button
      const toggleButton = screen.getByLabelText("Toggle menu");
      await user.click(toggleButton);

      // Verify menu is open (check mobile menu version)
      const servicesLinks = screen.getAllByText("Services");
      const mobileServicesLink = servicesLinks.find((el) =>
        el.className.includes("py-2"),
      );
      expect(mobileServicesLink).toBeVisible();

      // Press Escape
      await user.keyboard("{Escape}");

      // Verify menu is closed
      expect(mobileServicesLink).not.toBeVisible();

      // Verify focus is back on toggle button
      expect(toggleButton).toHaveFocus();
    });

    it("should move focus into menu when opened", async () => {
      const user = userEvent.setup();
      render(<Navigation />);

      const toggleButton = screen.getByLabelText("Toggle menu");
      await user.click(toggleButton);

      // Focus should be on the first menu item (Services in mobile menu)
      const servicesLinks = screen.getAllByText("Services");
      const mobileServicesLink = servicesLinks.find((el) =>
        el.className.includes("py-2"),
      );
      expect(mobileServicesLink).toHaveFocus();
    });

    it("should trap focus within menu when open (Tab cycles within menu)", async () => {
      const user = userEvent.setup();
      render(<Navigation />);

      const toggleButton = screen.getByLabelText("Toggle menu");
      await user.click(toggleButton);

      // Get mobile menu links
      const servicesLinks = screen.getAllByText("Services");
      const servicesLink = servicesLinks.find((el) =>
        el.className.includes("py-2"),
      );
      const aboutLinks = screen.getAllByText("About");
      const aboutLink = aboutLinks.find((el) => el.className.includes("py-2"));

      // Focus should be on first item
      expect(servicesLink).toHaveFocus();

      // Tab to next item
      await user.tab();
      expect(aboutLink).toHaveFocus();

      // Tab through to last item (Get Started)
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();

      const getStartedButton = screen
        .getAllByText("Get Started")
        .find((el) => el.className.includes("text-center"));
      expect(getStartedButton).toHaveFocus();

      // Tab should cycle back to first item (focus trap)
      await user.tab();
      expect(servicesLink).toHaveFocus();
    });

    it("should handle Shift+Tab to move focus backwards in menu", async () => {
      const user = userEvent.setup();
      render(<Navigation />);

      const toggleButton = screen.getByLabelText("Toggle menu");
      await user.click(toggleButton);

      // Get mobile menu links
      const servicesLinks = screen.getAllByText("Services");
      const servicesLink = servicesLinks.find((el) =>
        el.className.includes("py-2"),
      );
      const contactLinks = screen.getAllByText("Contact");
      const contactLink = contactLinks.find((el) =>
        el.className.includes("py-2"),
      );

      // Move to last item (Get Started in mobile menu)
      const getStartedButton = screen
        .getAllByText("Get Started")
        .find((el) => el.className.includes("text-center"));
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();
      expect(getStartedButton).toHaveFocus();

      // Shift+Tab should move to previous item
      await user.tab({ shift: true });
      expect(contactLink).toHaveFocus();

      // Continue backwards to first item
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      await user.tab({ shift: true });
      expect(servicesLink).toHaveFocus();

      // Shift+Tab from first should cycle to last
      await user.tab({ shift: true });
      expect(getStartedButton).toHaveFocus();
    });
  });
});
