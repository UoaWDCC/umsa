const React = ((m, n) => n || !m?.__esModule ? {	...typeof m === "object" && !Array.isArray(m) || typeof m === "function" ? m : {},	default: m} : m)(__vite__cjsImport0_react, 1);const ReactDOM = ((m, n) => n || !m?.__esModule ? {	...typeof m === "object" && !Array.isArray(m) || typeof m === "function" ? m : {},	default: m} : m)(__vite__cjsImport1_reactDom_client, 1);const _jsxDEV = __vite__cjsImport7_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=3adf9d57";
import __vite__cjsImport1_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=3adf9d57";
import { createBrowserRouter, Navigate, RouterProvider } from "/node_modules/.vite/deps/react-router-dom.js?v=3adf9d57";
import { QueryClient, QueryClientProvider } from "/node_modules/.vite/deps/@tanstack_react-query.js?v=3adf9d57";
import RootLayout from "/src/layouts/RootLayout.tsx?t=1788260160941";
import App from "/src/App.tsx?t=1788311135940";
import "/src/index.css?t=1788311135940";
var _jsxFileName = "/Users/tw1738/umsa/client/src/main.tsx";
import __vite__cjsImport7_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3adf9d57";
{}
import ProjectTeam from "/src/pages/Project-Team.tsx";
import Events from "/src/pages/Events.tsx";
import SignUp from "/src/pages/SignUp.tsx";
import Gallery from "/src/pages/Gallery.tsx";
import Team from "/src/pages/Team.tsx";
import Contact from "/src/pages/Contact.tsx";
import Sponsors from "/src/pages/Sponsors.tsx";
import FAQ from "/src/pages/Frequent-Asked-Question.tsx";
import About from "/src/pages/About.tsx";
{}
import Pruna from "/src/pages/project-team/Pruna.tsx";
import Alanna from "/src/pages/project-team/Alanna.tsx";
import Tadiwa from "/src/pages/project-team/Tadiwa.tsx";
import Terrence from "/src/pages/project-team/Terrence.tsx";
import Alex from "/src/pages/project-team/Alex.tsx";
{}
import AdminLayout from "/src/layouts/AdminLayout.tsx";
import AdminLogin from "/src/pages/admin/Login.tsx";
import HomeContentEditor from "/src/pages/admin/HomeContentEditor.tsx";
{}
const router = createBrowserRouter([
	{
		path: "/",
		element: /* @__PURE__ */ _jsxDEV(RootLayout, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 44,
			columnNumber: 14
		}, this),
		children: [
			{
				index: true,
				element: /* @__PURE__ */ _jsxDEV(App, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 46,
					columnNumber: 31
				}, this)
			},
			{
				path: "events",
				element: /* @__PURE__ */ _jsxDEV(Events, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 34
				}, this)
			},
			{
				path: "team",
				element: /* @__PURE__ */ _jsxDEV(Team, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 32
				}, this)
			},
			{
				path: "project-team",
				element: /* @__PURE__ */ _jsxDEV(ProjectTeam, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 40
				}, this)
			},
			{
				path: "alanna",
				element: /* @__PURE__ */ _jsxDEV(Alanna, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 34
				}, this)
			},
			{
				path: "alex",
				element: /* @__PURE__ */ _jsxDEV(Alex, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 32
				}, this)
			},
			{
				path: "pruna",
				element: /* @__PURE__ */ _jsxDEV(Pruna, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 33
				}, this)
			},
			{
				path: "tadiwa",
				element: /* @__PURE__ */ _jsxDEV(Tadiwa, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 34
				}, this)
			},
			{
				path: "terrence",
				element: /* @__PURE__ */ _jsxDEV(Terrence, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 54,
					columnNumber: 36
				}, this)
			},
			{
				path: "sign-up",
				element: /* @__PURE__ */ _jsxDEV(SignUp, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 55,
					columnNumber: 35
				}, this)
			},
			{
				path: "gallery",
				element: /* @__PURE__ */ _jsxDEV(Gallery, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 35
				}, this)
			},
			{
				path: "faq",
				element: /* @__PURE__ */ _jsxDEV(FAQ, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 57,
					columnNumber: 31
				}, this)
			},
			{
				path: "contact",
				element: /* @__PURE__ */ _jsxDEV(Contact, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 58,
					columnNumber: 35
				}, this)
			},
			{
				path: "sponsors",
				element: /* @__PURE__ */ _jsxDEV(Sponsors, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 59,
					columnNumber: 36
				}, this)
			},
			{
				path: "about",
				element: /* @__PURE__ */ _jsxDEV(About, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 60,
					columnNumber: 33
				}, this)
			}
		]
	},
	(
	/* admin routes live OUTSIDE RootLayout so they don't get the public navbar/footer */
	{
		path: "/admin/login",
		element: /* @__PURE__ */ _jsxDEV(AdminLogin, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 66,
			columnNumber: 14
		}, this)
	}),
	{
		path: "/admin",
		element: /* @__PURE__ */ _jsxDEV(AdminLayout, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 70,
			columnNumber: 14
		}, this),
		children: [{
			index: true,
			element: /* @__PURE__ */ _jsxDEV(Navigate, {
				to: "/admin/home-content",
				replace: true
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 72,
				columnNumber: 31
			}, this)
		}, {
			path: "home-content",
			element: /* @__PURE__ */ _jsxDEV(HomeContentEditor, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 73,
				columnNumber: 40
			}, this)
		}]
	}
]);
const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1 } } });
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ _jsxDEV(React.StrictMode, { children: /* @__PURE__ */ _jsxDEV(QueryClientProvider, {
	client: queryClient,
	children: /* @__PURE__ */ _jsxDEV(RouterProvider, { router }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 85,
		columnNumber: 7
	}, this)
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 84,
	columnNumber: 5
}, this) }, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 83,
	columnNumber: 3
}, this));

//# sourceMappingURL=data:application/json;base64,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aW4udHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbS9jbGllbnRcIjtcbmltcG9ydCB7IGNyZWF0ZUJyb3dzZXJSb3V0ZXIsIE5hdmlnYXRlLCBSb3V0ZXJQcm92aWRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgeyBRdWVyeUNsaWVudCwgUXVlcnlDbGllbnRQcm92aWRlciB9IGZyb20gXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIjtcbmltcG9ydCBSb290TGF5b3V0IGZyb20gXCIuL2xheW91dHMvUm9vdExheW91dFwiO1xuaW1wb3J0IEFwcCBmcm9tIFwiLi9BcHBcIjtcbmltcG9ydCBcIi4vaW5kZXguY3NzXCI7XG5cbntcbiAgLyogcGFnZSBpbXBvcnRzICovXG59XG5pbXBvcnQgUHJvamVjdFRlYW0gZnJvbSBcIi4vcGFnZXMvUHJvamVjdC1UZWFtXCI7XG5pbXBvcnQgRXZlbnRzIGZyb20gXCIuL3BhZ2VzL0V2ZW50c1wiO1xuaW1wb3J0IFNpZ25VcCBmcm9tIFwiLi9wYWdlcy9TaWduVXBcIjtcbmltcG9ydCBHYWxsZXJ5IGZyb20gXCIuL3BhZ2VzL0dhbGxlcnlcIjtcbmltcG9ydCBUZWFtIGZyb20gXCIuL3BhZ2VzL1RlYW1cIjtcbmltcG9ydCBDb250YWN0IGZyb20gXCIuL3BhZ2VzL0NvbnRhY3RcIjtcbmltcG9ydCBTcG9uc29ycyBmcm9tIFwiLi9wYWdlcy9TcG9uc29yc1wiO1xuaW1wb3J0IEZBUSBmcm9tIFwiLi9wYWdlcy9GcmVxdWVudC1Bc2tlZC1RdWVzdGlvblwiO1xuaW1wb3J0IEFib3V0IGZyb20gXCIuL3BhZ2VzL0Fib3V0XCI7XG5cbntcbiAgLyogcHJvamVjdCB0ZWFtIGltcG9ydHMgKi9cbn1cbmltcG9ydCBQcnVuYSBmcm9tIFwiLi9wYWdlcy9wcm9qZWN0LXRlYW0vUHJ1bmFcIjtcbmltcG9ydCBBbGFubmEgZnJvbSBcIi4vcGFnZXMvcHJvamVjdC10ZWFtL0FsYW5uYVwiO1xuaW1wb3J0IFRhZGl3YSBmcm9tIFwiLi9wYWdlcy9wcm9qZWN0LXRlYW0vVGFkaXdhXCI7XG5pbXBvcnQgVGVycmVuY2UgZnJvbSBcIi4vcGFnZXMvcHJvamVjdC10ZWFtL1RlcnJlbmNlXCI7XG5pbXBvcnQgQWxleCBmcm9tIFwiLi9wYWdlcy9wcm9qZWN0LXRlYW0vQWxleFwiO1xuXG57XG4gIC8qIGFkbWluIChDTVMpIGltcG9ydHMgKi9cbn1cbmltcG9ydCBBZG1pbkxheW91dCBmcm9tIFwiLi9sYXlvdXRzL0FkbWluTGF5b3V0XCI7XG5pbXBvcnQgQWRtaW5Mb2dpbiBmcm9tIFwiLi9wYWdlcy9hZG1pbi9Mb2dpblwiO1xuaW1wb3J0IEhvbWVDb250ZW50RWRpdG9yIGZyb20gXCIuL3BhZ2VzL2FkbWluL0hvbWVDb250ZW50RWRpdG9yXCI7XG5cbntcbiAgLyogaGVyZSdzIHdoZXJlIHdlIHNldCB1cCBhbGwgb3VyIHJvdXRpbmcgKi9cbn1cbmNvbnN0IHJvdXRlciA9IGNyZWF0ZUJyb3dzZXJSb3V0ZXIoW1xuICB7XG4gICAgcGF0aDogXCIvXCIsXG4gICAgZWxlbWVudDogPFJvb3RMYXlvdXQgLz4sXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHsgaW5kZXg6IHRydWUsIGVsZW1lbnQ6IDxBcHAgLz4gfSxcbiAgICAgIHsgcGF0aDogXCJldmVudHNcIiwgZWxlbWVudDogPEV2ZW50cyAvPiB9LFxuICAgICAgeyBwYXRoOiBcInRlYW1cIiwgZWxlbWVudDogPFRlYW0gLz4gfSxcbiAgICAgIHsgcGF0aDogXCJwcm9qZWN0LXRlYW1cIiwgZWxlbWVudDogPFByb2plY3RUZWFtIC8+IH0sXG4gICAgICB7IHBhdGg6IFwiYWxhbm5hXCIsIGVsZW1lbnQ6IDxBbGFubmEgLz4gfSxcbiAgICAgIHsgcGF0aDogXCJhbGV4XCIsIGVsZW1lbnQ6IDxBbGV4IC8+IH0sXG4gICAgICB7IHBhdGg6IFwicHJ1bmFcIiwgZWxlbWVudDogPFBydW5hIC8+IH0sXG4gICAgICB7IHBhdGg6IFwidGFkaXdhXCIsIGVsZW1lbnQ6IDxUYWRpd2EgLz4gfSxcbiAgICAgIHsgcGF0aDogXCJ0ZXJyZW5jZVwiLCBlbGVtZW50OiA8VGVycmVuY2UgLz4gfSxcbiAgICAgIHsgcGF0aDogXCJzaWduLXVwXCIsIGVsZW1lbnQ6IDxTaWduVXAgLz4gfSxcbiAgICAgIHsgcGF0aDogXCJnYWxsZXJ5XCIsIGVsZW1lbnQ6IDxHYWxsZXJ5IC8+IH0sXG4gICAgICB7IHBhdGg6IFwiZmFxXCIsIGVsZW1lbnQ6IDxGQVEgLz4gfSxcbiAgICAgIHsgcGF0aDogXCJjb250YWN0XCIsIGVsZW1lbnQ6IDxDb250YWN0IC8+IH0sXG4gICAgICB7IHBhdGg6IFwic3BvbnNvcnNcIiwgZWxlbWVudDogPFNwb25zb3JzIC8+IH0sXG4gICAgICB7IHBhdGg6IFwiYWJvdXRcIiwgZWxlbWVudDogPEFib3V0IC8+IH0sXG4gICAgXSxcbiAgfSxcbiAgLyogYWRtaW4gcm91dGVzIGxpdmUgT1VUU0lERSBSb290TGF5b3V0IHNvIHRoZXkgZG9uJ3QgZ2V0IHRoZSBwdWJsaWMgbmF2YmFyL2Zvb3RlciAqL1xuICB7XG4gICAgcGF0aDogXCIvYWRtaW4vbG9naW5cIixcbiAgICBlbGVtZW50OiA8QWRtaW5Mb2dpbiAvPixcbiAgfSxcbiAge1xuICAgIHBhdGg6IFwiL2FkbWluXCIsXG4gICAgZWxlbWVudDogPEFkbWluTGF5b3V0IC8+LFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7IGluZGV4OiB0cnVlLCBlbGVtZW50OiA8TmF2aWdhdGUgdG89XCIvYWRtaW4vaG9tZS1jb250ZW50XCIgcmVwbGFjZSAvPiB9LFxuICAgICAgeyBwYXRoOiBcImhvbWUtY29udGVudFwiLCBlbGVtZW50OiA8SG9tZUNvbnRlbnRFZGl0b3IgLz4gfSxcbiAgICBdLFxuICB9LFxuXSk7XG5cbmNvbnN0IHF1ZXJ5Q2xpZW50ID0gbmV3IFF1ZXJ5Q2xpZW50KHtcbiAgZGVmYXVsdE9wdGlvbnM6IHsgcXVlcmllczogeyByZXRyeTogMSB9IH0sXG59KTtcblxuUmVhY3RET00uY3JlYXRlUm9vdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikgYXMgSFRNTEVsZW1lbnQpLnJlbmRlcihcbiAgPFJlYWN0LlN0cmljdE1vZGU+XG4gICAgPFF1ZXJ5Q2xpZW50UHJvdmlkZXIgY2xpZW50PXtxdWVyeUNsaWVudH0+XG4gICAgICA8Um91dGVyUHJvdmlkZXIgcm91dGVyPXtyb3V0ZXJ9IC8+XG4gICAgPC9RdWVyeUNsaWVudFByb3ZpZGVyPlxuICA8L1JlYWN0LlN0cmljdE1vZGU+LFxuKTtcbiJdfQ==