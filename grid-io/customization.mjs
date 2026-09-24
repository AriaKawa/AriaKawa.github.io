export const BODIES = [
  { id: "phantom", name: "Phantom", description: "Sculpted sport fairing" },
  { id: "vector", name: "Vector", description: "Exposed tubular frame" },
  { id: "bulwark", name: "Bulwark", description: "Wide armored chassis" },
];
export const WHEELS = [
  { id: "turbine", name: "Turbine", description: "Recessed turbine discs" },
  { id: "spoke", name: "Spoke", description: "Open six-spoke alloys" },
  { id: "tread", name: "Tread", description: "Segmented traction tires" },
];
export const RIDERS = [
  { id: "male", name: "Male" },
  { id: "female", name: "Female" },
];

export function normalizeLoadout(value) {
  const data = value && typeof value === "object" ? value : {};
  const valid = (list, id) =>
    list.some((item) => item.id === id) ? id : list[0].id;
  return {
    body: valid(BODIES, data.body),
    wheels: valid(WHEELS, data.wheels),
    rider: valid(RIDERS, data.rider),
  };
}

export function loadoutKey(skin, loadout) {
  const parts = normalizeLoadout(loadout);
  return `${skin}/${parts.body}/${parts.wheels}/${parts.rider}`;
}
