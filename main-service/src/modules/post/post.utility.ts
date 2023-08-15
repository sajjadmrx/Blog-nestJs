export function getCategoriesData(ids: string[] | number[]): any[] {
  return ids.map((a) => {
    return {
      assignedAt: new Date(),
      category: {
        connect: {
          id: Number(a),
        },
      },
    };
  });
}
