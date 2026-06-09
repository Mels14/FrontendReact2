import { Navigate, Outlet, useLocation } from "react-router-dom";

const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Rutas permitidas por rol
const routesByRole: Record<string, string[]> = {
  ADMIN: [
    '/usuarios', '/carreras', '/semestres', '/asignaturas',
    '/plan-estudios', '/grupos', '/matriculas', '/rubricas',
    '/evaluaciones', '/calificaciones',
  ],
  TEACHER: [
    '/rubricas', '/evaluaciones', '/calificaciones',
  ],
  STUDENT: [
    '/mis-rubricas', '/mis-calificaciones',
  ],
};

const isAllowed = (role: string, pathname: string) => {
  const allowed = routesByRole[role] || [];
  return allowed.some(route => pathname.startsWith(route));
};

const ProtectedRoute = () => {
  const user = getUser();
  const location = useLocation();

  if (!user) return <Navigate to="/auth/signin" replace />;

  // Rutas de creación/edición también permitidas
  if (isAllowed(user.role, location.pathname)) return <Outlet />;

  // Dashboard siempre permitido
  if (location.pathname === '/') return <Outlet />;

  // Redirige según rol si intenta acceder a ruta no permitida
  if (user.role === 'STUDENT') return <Navigate to="/mis-rubricas" replace />;
  if (user.role === 'TEACHER') return <Navigate to="/rubricas" replace />;
  return <Navigate to="/usuarios" replace />;
};

export default ProtectedRoute;