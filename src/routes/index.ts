import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const Demo= lazy(() => import('../pages/Demo'));
const Users = lazy(() => import('../pages/Users/page'));
const CreateUser = lazy(() => import('../pages/Users/create'));
const UpdateUser = lazy(() => import('../pages/Users/update'));
const CareersPage = lazy(() => import('../pages/Careers/page'));
const CreateCareer = lazy(() => import('../pages/Careers/create'));
const UpdateCareer = lazy(() => import('../pages/Careers/update'));
const SemestersPage = lazy(() => import('../pages/Semesters/page'));
const CreateSemester = lazy(() => import('../pages/Semesters/create'));
const UpdateSemester = lazy(() => import('../pages/Semesters/update'));
const SubjectsPage = lazy(() => import('../pages/Subjects/page'));
const CreateSubject = lazy(() => import('../pages/Subjects/create'));
const UpdateSubject = lazy(() => import('../pages/Subjects/update'));
const StudyPlansPage = lazy(() => import('../pages/StudyPlans/page'));
const CreateStudyPlan = lazy(() => import('../pages/StudyPlans/create'));
const UpdateStudyPlan = lazy(() => import('../pages/StudyPlans/update'));
const GroupsPage = lazy(() => import('../pages/Groups/page'));
const CreateGroup = lazy(() => import('../pages/Groups/create'));
const UpdateGroup = lazy(() => import('../pages/Groups/update'));

const coreRoutes = [
  {
    path: '/demo',
    title: 'Demo',
    component: Demo,
  },
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
  path: '/usuarios',
  title: 'Usuarios',
  component: Users,
  },
  {
  path: '/usuarios/crear',
  title: 'Crear Usuario',
  component: CreateUser,
  },
  {
    path: '/usuarios/editar/:id',
    title: 'Editar Usuario',
    component: UpdateUser,
  },
  { path: '/carreras', 
    title: 'Carreras', 
    component: CareersPage },
  { path: '/carreras/crear', 
    title: 'Crear Carrera', 
    component: CreateCareer },
  { path: '/carreras/editar/:id', 
    title: 'Editar Carrera', 
    component: UpdateCareer },
  { path: '/semestres', 
    title: 'Semestres', 
    component: SemestersPage },
  { path: '/semestres/crear', 
    title: 'Crear Semestre', 
    component: CreateSemester },
  { path: '/semestres/editar/:id', 
    title: 'Editar Semestre', 
    component: UpdateSemester },
  { 
    path: '/asignaturas', 
    title: 'Asignaturas', 
    component: SubjectsPage 
  },
  { 
    path: '/asignaturas/crear', 
    title: 'Crear Asignatura', 
    component: CreateSubject 
  },
  { 
    path: '/asignaturas/editar/:id', 
    title: 'Editar Asignatura', 
    component: UpdateSubject 
  },
  { 
    path: '/plan-estudios', 
    title: 'Plan de Estudios', 
    component: StudyPlansPage 
  },
  { 
    path: '/plan-estudios/crear', 
    title: 'Crear Plan', 
    component: CreateStudyPlan 
  },
  { 
    path: '/plan-estudios/editar/:id',
    title: 'Editar Plan', 
    component: UpdateStudyPlan 
  },
  { 
    path: '/grupos', 
    title: 'Grupos', 
    component: GroupsPage
   },
  { 
    path: '/grupos/crear', 
    title: 'Crear Grupo', 
    component: CreateGroup 
  },
  { 
    path: '/grupos/editar/:id', 
    title: 'Editar Grupo', 
    component: UpdateGroup },

];

const routes = [...coreRoutes];
export default routes;
