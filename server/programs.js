export function getProgram(program) {
  const programs = {
    vexv5: 1,
    vexiq: 41,
    vexai: 57,
    vexu: 4,
  };
  if (program in programs) {
    return programs[program];
  } else {
    console.error(`Program ${program} not found`);
    return undefined;
  }
}
