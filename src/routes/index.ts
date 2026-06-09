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
const RegistrationsPage = lazy(() => import('../pages/Registrations/page'));
const CreateRegistration = lazy(() => import('../pages/Registrations/create'));
const UpdateRegistration = lazy(() => import('../pages/Registrations/update'));
const RubricsPage = lazy(() => import('../pages/Rubrics/page'));
const CreateRubric = lazy(() => import('../pages/Rubrics/create'));
const UpdateRubric = lazy(() => import('../pages/Rubrics/update'));
const EvaluationsPage = lazy(() => import('../pages/Evaluations/page'));
const CreateEvaluation = lazy(() => import('../pages/Evaluations/create'));
const UpdateEvaluation = lazy(() => import('../pages/Evaluations/update'));
const GradesPage = lazy(() => import('../pages/Grades/page'));
const StudentRubricsPage = lazy(() => import('../pages/Student/rubrics'));
const StudentGradesPage = lazy(() => import('../pages/Student/grades'));


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
  { 
    path: '/matriculas', 
    title: 'Matrículas', 
    component: RegistrationsPage 
  },
  { 
    path: '/matriculas/crear', 
    title: 'Crear Matrícula', 
    component: CreateRegistration 
  },
  { 
    path: '/matriculas/editar/:id', 
    title: 'Editar Matrícula', 
    component: UpdateRegistration
  },

  { 
    path: '/rubricas', 
    title: 'Rúbricas', 
    component: RubricsPage 
  },
  { 
    path: '/rubricas/crear', 
    title: 'Crear Rúbrica', 
    component: CreateRubric 
  },
  { path: '/rubricas/editar/:id', 
    title: 'Editar Rúbrica', 
    component: UpdateRubric 
  },

  { 
    path: '/evaluaciones', 
    title: 'Evaluaciones', 
    component: EvaluationsPage 
  },
  { 
    path: '/evaluaciones/crear', 
    title: 'Crear Evaluación', 
    component: CreateEvaluation 
  },
  { path: '/evaluaciones/editar/:id', 
    title: 'Editar Evaluación', 
    component: UpdateEvaluation 
  },
  { 
    path: '/calificaciones', 
    title: 'Calificaciones', 
    component: GradesPage 
  },

{ path: '/mis-rubricas', title: 'Mis Rúbricas', component: StudentRubricsPage },
{ path: '/mis-calificaciones', title: 'Mis Calificaciones', component: StudentGradesPage },

];

const routes = [...coreRoutes];
export default routes;
