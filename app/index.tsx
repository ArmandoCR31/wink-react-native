/**
 * Index Component
 *
 * This component serves as the entry point for the main screen of the application.
 * It renders the `Main` component, which typically serves as the central user interface
 * for the app's home screen.
 *
 * The component handles:
 * - Rendering the `Main` component as the main content of the home screen.
 *
 * // Usage in another component
 * <Index />
 */
import { Main } from "../components/Main";

export default function Index() {
  return <Main />;
}
