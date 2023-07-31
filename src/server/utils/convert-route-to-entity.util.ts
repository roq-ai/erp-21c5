const mapping: Record<string, string> = {
  companies: 'company',
  'data-analyses': 'data_analysis',
  engagements: 'engagement',
  'erp-processes': 'erp_process',
  'gst-accountings': 'gst_accounting',
  'performance-evaluations': 'performance_evaluation',
  'time-trackings': 'time_tracking',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
