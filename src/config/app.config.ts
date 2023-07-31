interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Accountant'],
  customerRoles: ['End Customer'],
  tenantRoles: ['Business Owner', 'Accountant', 'Team Member'],
  tenantName: 'Company',
  applicationName: 'ERP',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
