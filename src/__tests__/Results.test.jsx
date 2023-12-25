import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Results from "../Results";

test("renders correct with no pets", () => {
  const { asFragment } = render(<Results pets={[]} />);
  expect(asFragment()).toMatchSnapshot();
});
