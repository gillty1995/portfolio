/**
 * Supplying onUpdate keeps Motion animations on its JS render loop.
 * The installed Motion native-animation path cancels WAAPI before its final
 * MotionValue reaches the DOM, exposing the previous inline style for a frame.
 * Use for clip-path/opacity/filter transitions where that handoff causes flashes.
 * No React state updates are needed: Motion writes the styles itself.
 */
export function keepMotionOnRenderLoop(): void {}
