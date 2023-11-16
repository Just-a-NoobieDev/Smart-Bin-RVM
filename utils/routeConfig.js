import Roles from "./roles";
import RouteNames from "./RouteNames";

const routeConfig = {
  auth: {
    default: RouteNames.login,
    [RouteNames.signup]: RouteNames.signup,
    [RouteNames.login]: RouteNames.login,
  },
  [Roles.student]: {
    default: RouteNames.dashboard,
    [RouteNames.dashboard]: RouteNames.dashboard,
    [RouteNames.transactions]: RouteNames.transactions,
    [RouteNames.pointAlloc]: RouteNames.pointAlloc,
    [RouteNames.profile]: RouteNames.profile,
  },
  [Roles.admin]: {
    default: RouteNames.admin,
    [RouteNames.admin]: RouteNames.admin,
    [RouteNames.adminTransactions]: RouteNames.adminTransactions,
    [RouteNames.adminPointAlloc]: RouteNames.adminPointAlloc,
    [RouteNames.adminStudUsers]: RouteNames.adminStudUsers,
    [RouteNames.adminSubjects]: RouteNames.adminSubjects,
    [RouteNames.adminProfile]: RouteNames.adminProfile,
    [RouteNames.adminReports]: RouteNames.adminReports,
  },

  [Roles.superAdmin]: {
    default: RouteNames.admin,
    [RouteNames.admin]: RouteNames.admin,
    [RouteNames.adminTransactions]: RouteNames.adminTransactions,
    [RouteNames.adminPointAlloc]: RouteNames.adminPointAlloc,
    [RouteNames.adminStudUsers]: RouteNames.adminStudUsers,
    [RouteNames.adminSubjects]: RouteNames.adminSubjects,
    [RouteNames.adminProfile]: RouteNames.adminProfile,
    [RouteNames.adminReports]: RouteNames.adminReports,
    [RouteNames.adminAdminUsers]: RouteNames.adminAdminUsers,
  },
};

export default routeConfig;
