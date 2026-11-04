/** Tiny event bridge: a project card asks the (always-mounted) overlay to play the page transition. */
export interface TransitionRequest {
  href: string;
  /** Project name, shown while the page expands. */
  label: string;
  /** Background colour of the card the transition grows from. */
  hex: string;
  dark: boolean;
  /** Viewport rectangle of the card's media area. */
  rect: { top: number; left: number; width: number; height: number };
}

type Handler = (req: TransitionRequest) => void;

let handler: Handler | null = null;

export function registerProjectTransition(h: Handler) {
  handler = h;
  return () => {
    if (handler === h) handler = null;
  };
}

/** Returns true when the overlay took over; false means "navigate normally". */
export function startProjectTransition(req: TransitionRequest): boolean {
  if (!handler) return false;
  handler(req);
  return true;
}
