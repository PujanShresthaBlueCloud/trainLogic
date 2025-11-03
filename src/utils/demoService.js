export const createDemoRecord = async (demoData) => { try { const response = await fetch('/api/demo', { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(demoData) });

const result = await response.json();

if (!response.ok) {
  throw new Error(result.message || 'Failed to create demo record');
}

return result;
} catch (error) { console.error('Error creating demo record:', error); throw error; } };