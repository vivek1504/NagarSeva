"use strict";
console.log("🔥 seed.js loaded");

var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_js_1 = require("./lib/prisma.js");
var bcrypt_1 = require("bcrypt");
/* ===================== CONSTANTS ===================== */
var SALT_ROUNDS = 10;
function hashPassword(password) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2 /*return*/, bcrypt_1.default.hash(password, SALT_ROUNDS)];
    });
  });
}
function main() {
  return __awaiter(this, void 0, void 0, function () {
    var admin,
      _a,
      _b,
      surveyorData,
      _c,
      _d,
      engineerData,
      _e,
      _f,
      allSurveyors,
      allEngineers,
      ward1,
      ward2,
      ward3,
      ward4,
      ward5,
      route1,
      route2,
      route3,
      route4,
      route5,
      route6,
      route7,
      route8,
      assignments,
      _g,
      session1,
      session2,
      session3,
      session4,
      issue1,
      issue2,
      issue3,
      issue4,
      issue5,
      issue6,
      issue7,
      issue8,
      issue9,
      issue10;
    var _h, _j, _k, _l;
    var _this = this;
    return __generator(this, function (_m) {
      switch (_m.label) {
        case 0:
          console.log("🌱 Seeding VMC Civic Issue Monitoring System...");
          _b = (_a = prisma_js_1.prisma.user).create;
          _h = {};
          _j = {
            name: "Rakesh Sharma",
            email: "admin@vmc.gov.in",
          };
          return [4 /*yield*/, hashPassword("admin123")];
        case 1:
          return [
            4 /*yield*/,
            _b.apply(_a, [
              ((_h.data = ((_j.password = _m.sent()), (_j.role = "ADMIN"), _j)),
              _h),
            ]),
          ];
        case 2:
          admin = _m.sent();
          surveyorData = [
            {
              name: "Amit Patel",
              email: "amit.patel@vmc.gov.in",
              password: "pass1",
              role: "SURVEYOR",
            },
            {
              name: "Priya Desai",
              email: "priya.desai@vmc.gov.in",
              password: "pass2",
              role: "SURVEYOR",
            },
            {
              name: "Rajesh Mehta",
              email: "rajesh.mehta@vmc.gov.in",
              password: "pass3",
              role: "SURVEYOR",
            },
            {
              name: "Komal Shah",
              email: "komal.shah@vmc.gov.in",
              password: "pass4",
              role: "SURVEYOR",
            },
            {
              name: "Vikram Joshi",
              email: "vikram.joshi@vmc.gov.in",
              password: "pass5",
              role: "SURVEYOR",
            },
          ];
          _d = (_c = prisma_js_1.prisma.user).createMany;
          _k = {};
          return [
            4 /*yield*/,
            Promise.all(
              surveyorData.map(function (u) {
                return __awaiter(_this, void 0, void 0, function () {
                  var _a;
                  var _b;
                  return __generator(this, function (_c) {
                    switch (_c.label) {
                      case 0:
                        _a = [__assign({}, u)];
                        _b = {};
                        return [4 /*yield*/, hashPassword(u.password)];
                      case 1:
                        return [
                          2 /*return*/,
                          __assign.apply(
                            void 0,
                            _a.concat([((_b.password = _c.sent()), _b)]),
                          ),
                        ];
                    }
                  });
                });
              }),
            ),
          ];
        case 3:
          return [4 /*yield*/, _d.apply(_c, [((_k.data = _m.sent()), _k)])];
        case 4:
          _m.sent();
          engineerData = [
            {
              name: "Suresh Pandya",
              email: "suresh.pandya@vmc.gov.in",
              password: "pass3",
              role: "ENGINEER",
            },
            {
              name: "Hetal Trivedi",
              email: "hetal.trivedi@vmc.gov.in",
              password: "pass4",
              role: "ENGINEER",
            },
            {
              name: "Mitesh Bhatt",
              email: "mitesh.bhatt@vmc.gov.in",
              password: "pass5",
              role: "ENGINEER",
            },
            {
              name: "Sneha Raval",
              email: "sneha.raval@vmc.gov.in",
              password: "pass6",
              role: "ENGINEER",
            },
            {
              name: "Darshan Parmar",
              email: "darshan.parmar@vmc.gov.in",
              password: "pass7",
              role: "ENGINEER",
            },
          ];
          _f = (_e = prisma_js_1.prisma.user).createMany;
          _l = {};
          return [
            4 /*yield*/,
            Promise.all(
              engineerData.map(function (u) {
                return __awaiter(_this, void 0, void 0, function () {
                  var _a;
                  var _b;
                  return __generator(this, function (_c) {
                    switch (_c.label) {
                      case 0:
                        _a = [__assign({}, u)];
                        _b = {};
                        return [4 /*yield*/, hashPassword(u.password)];
                      case 1:
                        return [
                          2 /*return*/,
                          __assign.apply(
                            void 0,
                            _a.concat([((_b.password = _c.sent()), _b)]),
                          ),
                        ];
                    }
                  });
                });
              }),
            ),
          ];
        case 5:
          return [4 /*yield*/, _f.apply(_e, [((_l.data = _m.sent()), _l)])];
        case 6:
          _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.user.findMany({
              where: { role: "SURVEYOR" },
            }),
          ];
        case 7:
          allSurveyors = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.user.findMany({
              where: { role: "ENGINEER" },
            }),
          ];
        case 8:
          allEngineers = _m.sent();
          if (allSurveyors.length < 2)
            throw new Error("Surveyor creation failed");
          if (allEngineers.length < 2)
            throw new Error("Engineer creation failed");
          return [
            4 /*yield*/,
            prisma_js_1.prisma.ward.create({
              data: { name: "Alkapuri Ward", number: 1 },
            }),
          ];
        case 9:
          ward1 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.ward.create({
              data: { name: "Sayajigunj Ward", number: 2 },
            }),
          ];
        case 10:
          ward2 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.ward.create({
              data: { name: "Manjalpur Ward", number: 3 },
            }),
          ];
        case 11:
          ward3 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.ward.create({
              data: { name: "Karelibaug Ward", number: 4 },
            }),
          ];
        case 12:
          ward4 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.ward.create({
              data: { name: "Waghodia Road Ward", number: 5 },
            }),
          ];
        case 13:
          ward5 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.route.create({
              data: { name: "RC Dutt Road - Alkapuri", wardId: ward1.id },
            }),
          ];
        case 14:
          route1 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.route.create({
              data: {
                name: "Sayaji Baug to Railway Station",
                wardId: ward2.id,
              },
            }),
          ];
        case 15:
          route2 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.route.create({
              data: { name: "Fatehgunj Main Road", wardId: ward2.id },
            }),
          ];
        case 16:
          route3 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.route.create({
              data: { name: "Manjalpur Industrial Area", wardId: ward3.id },
            }),
          ];
        case 17:
          route4 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.route.create({
              data: { name: "TP 13 Karelibaug", wardId: ward4.id },
            }),
          ];
        case 18:
          route5 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.route.create({
              data: { name: "Waghodia Ring Road", wardId: ward5.id },
            }),
          ];
        case 19:
          route6 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.route.create({
              data: { name: "Productivity Road - Alkapuri", wardId: ward1.id },
            }),
          ];
        case 20:
          route7 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.route.create({
              data: { name: "Jetalpur Road", wardId: ward4.id },
            }),
          ];
        case 21:
          route8 = _m.sent();
          return [
            4 /*yield*/,
            Promise.all([
              prisma_js_1.prisma.routeAssignment.create({
                data: {
                  routeId: route1.id,
                  surveyorId: allSurveyors[0].id,
                  status: "IN_PROGRESS",
                },
              }),
              prisma_js_1.prisma.routeAssignment.create({
                data: {
                  routeId: route2.id,
                  surveyorId: allSurveyors[1].id,
                  status: "COMPLETED",
                  completed: true,
                },
              }),
              prisma_js_1.prisma.routeAssignment.create({
                data: {
                  routeId: route3.id,
                  surveyorId: allSurveyors[2].id,
                  status: "PENDING",
                },
              }),
              prisma_js_1.prisma.routeAssignment.create({
                data: {
                  routeId: route4.id,
                  surveyorId: allSurveyors[3].id,
                  status: "PENDING",
                },
              }),
              prisma_js_1.prisma.routeAssignment.create({
                data: {
                  routeId: route5.id,
                  surveyorId: allSurveyors[4].id,
                  status: "IN_PROGRESS",
                },
              }),
              prisma_js_1.prisma.routeAssignment.create({
                data: {
                  routeId: route6.id,
                  surveyorId: allSurveyors[0].id,
                  status: "PENDING",
                },
              }),
              prisma_js_1.prisma.routeAssignment.create({
                data: {
                  routeId: route7.id,
                  surveyorId: allSurveyors[1].id,
                  status: "PENDING",
                },
              }),
              prisma_js_1.prisma.routeAssignment.create({
                data: {
                  routeId: route8.id,
                  surveyorId: allSurveyors[2].id,
                  status: "COMPLETED",
                  completed: true,
                },
              }),
            ]),
          ];
        case 22:
          assignments = _m.sent();
          return [
            4 /*yield*/,
            Promise.all([
              prisma_js_1.prisma.surveySession.create({
                data: {
                  routeAssignmentId: assignments[0].id,
                  startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
                },
              }),
              prisma_js_1.prisma.surveySession.create({
                data: {
                  routeAssignmentId: assignments[1].id,
                  startedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
                  endedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
                },
              }),
              prisma_js_1.prisma.surveySession.create({
                data: {
                  routeAssignmentId: assignments[4].id,
                  startedAt: new Date(),
                },
              }),
              prisma_js_1.prisma.surveySession.create({
                data: {
                  routeAssignmentId: assignments[7].id,
                  startedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
                  endedAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
                },
              }),
            ]),
          ];
        case 23:
          ((_g = _m.sent()),
            (session1 = _g[0]),
            (session2 = _g[1]),
            (session3 = _g[2]),
            (session4 = _g[3]));
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issue.create({
              data: {
                type: "POTHOLE",
                status: "DETECTED",
                latitude: 22.3103,
                longitude: 73.1879,
                wardId: ward2.id,
                routeId: route2.id,
                surveySessionId: session2.id,
                imageUrl: "https://vmc.gov.in/issues/pothole_sayajibaug_01.jpg",
              },
            }),
          ];
        case 24:
          issue1 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issue.create({
              data: {
                type: "GARBAGE",
                status: "ASSIGNED",
                latitude: 22.3089,
                longitude: 73.1742,
                wardId: ward1.id,
                routeId: route1.id,
                surveySessionId: session1.id,
                imageUrl: "https://vmc.gov.in/issues/garbage_alkapuri_01.jpg",
              },
            }),
          ];
        case 25:
          issue2 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issue.create({
              data: {
                type: "POTHOLE",
                status: "FIXED",
                latitude: 22.3156,
                longitude: 73.1901,
                wardId: ward2.id,
                routeId: route3.id,
                surveySessionId: session2.id,
                imageUrl: "https://vmc.gov.in/issues/pothole_fatehgunj_01.jpg",
              },
            }),
          ];
        case 26:
          issue3 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issue.create({
              data: {
                type: "GARBAGE",
                status: "DETECTED",
                latitude: 22.2756,
                longitude: 73.1823,
                wardId: ward3.id,
                routeId: route4.id,
                surveySessionId: session1.id,
                imageUrl: "https://vmc.gov.in/issues/garbage_manjalpur_01.jpg",
              },
            }),
          ];
        case 27:
          issue4 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issue.create({
              data: {
                type: "POTHOLE",
                status: "IN_PROGRESS",
                latitude: 22.3234,
                longitude: 73.2012,
                wardId: ward4.id,
                routeId: route5.id,
                surveySessionId: session3.id,
                imageUrl: "https://vmc.gov.in/issues/pothole_karelibaug_01.jpg",
              },
            }),
          ];
        case 28:
          issue5 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issue.create({
              data: {
                type: "GARBAGE",
                status: "DETECTED",
                latitude: 22.2945,
                longitude: 73.2156,
                wardId: ward5.id,
                routeId: route6.id,
                surveySessionId: session1.id,
                imageUrl: "https://vmc.gov.in/issues/garbage_waghodia_01.jpg",
              },
            }),
          ];
        case 29:
          issue6 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issue.create({
              data: {
                type: "POTHOLE",
                status: "ASSIGNED",
                latitude: 22.3067,
                longitude: 73.1698,
                wardId: ward1.id,
                routeId: route7.id,
                surveySessionId: session1.id,
                imageUrl:
                  "https://vmc.gov.in/issues/pothole_productivity_01.jpg",
              },
            }),
          ];
        case 30:
          issue7 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issue.create({
              data: {
                type: "GARBAGE",
                status: "RESOLVED",
                latitude: 22.3189,
                longitude: 73.2089,
                wardId: ward4.id,
                routeId: route8.id,
                surveySessionId: session4.id,
                imageUrl: "https://vmc.gov.in/issues/garbage_jetalpur_01.jpg",
              },
            }),
          ];
        case 31:
          issue8 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issue.create({
              data: {
                type: "POTHOLE",
                status: "DETECTED",
                latitude: 22.3045,
                longitude: 73.1856,
                wardId: ward2.id,
                routeId: route2.id,
                surveySessionId: session2.id,
                imageUrl: "https://vmc.gov.in/issues/pothole_sayajigunj_02.jpg",
              },
            }),
          ];
        case 32:
          issue9 = _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issue.create({
              data: {
                type: "GARBAGE",
                status: "FIXED",
                latitude: 22.2801,
                longitude: 73.1789,
                wardId: ward3.id,
                routeId: route4.id,
                surveySessionId: session1.id,
                imageUrl: "https://vmc.gov.in/issues/garbage_manjalpur_02.jpg",
              },
            }),
          ];
        case 33:
          issue10 = _m.sent();
          /* ===================== ISSUE ASSIGNMENTS ===================== */
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issueAssignment.createMany({
              data: [
                { issueId: issue1.id, engineerId: allEngineers[0].id },
                { issueId: issue2.id, engineerId: allEngineers[1].id },
                { issueId: issue3.id, engineerId: allEngineers[0].id },
                { issueId: issue4.id, engineerId: allEngineers[2].id },
                { issueId: issue5.id, engineerId: allEngineers[3].id },
                { issueId: issue6.id, engineerId: allEngineers[4].id },
                { issueId: issue7.id, engineerId: allEngineers[1].id },
                { issueId: issue8.id, engineerId: allEngineers[2].id },
                { issueId: issue9.id, engineerId: allEngineers[0].id },
                { issueId: issue10.id, engineerId: allEngineers[3].id },
              ],
            }),
          ];
        case 34:
          /* ===================== ISSUE ASSIGNMENTS ===================== */
          _m.sent();
          /* ===================== ISSUE RESOLUTIONS ===================== */
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issueResolution.create({
              data: {
                issueId: issue3.id,
                approved: true,
                feedback:
                  "Pothole repaired with hot-mix asphalt. Road surface restored.",
                verifiedByAdminId: admin.id,
              },
            }),
          ];
        case 35:
          /* ===================== ISSUE RESOLUTIONS ===================== */
          _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issueResolution.create({
              data: {
                issueId: issue2.id,
                approved: false,
                feedback:
                  "Garbage pile partially cleared. Complete removal pending.",
              },
            }),
          ];
        case 36:
          _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issueResolution.create({
              data: {
                issueId: issue8.id,
                approved: true,
                feedback:
                  "Area cleaned and sanitized. Regular collection schedule updated.",
                verifiedByAdminId: admin.id,
              },
            }),
          ];
        case 37:
          _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issueResolution.create({
              data: {
                issueId: issue5.id,
                approved: false,
                feedback:
                  "Initial patching done. Needs proper asphalting for permanent fix.",
              },
            }),
          ];
        case 38:
          _m.sent();
          return [
            4 /*yield*/,
            prisma_js_1.prisma.issueResolution.create({
              data: {
                issueId: issue10.id,
                approved: true,
                feedback:
                  "Garbage collected and area sanitized by sanitation team.",
                verifiedByAdminId: admin.id,
              },
            }),
          ];
        case 39:
          _m.sent();
          console.log(
            "✅ VMC Civic Issue Monitoring System seeded successfully",
          );
          console.log(
            "   Created: 1 Admin, "
              .concat(allSurveyors.length, " Surveyors, ")
              .concat(allEngineers.length, " Engineers"),
          );
          console.log("   Created: 5 Wards, 8 Routes, 8 Route Assignments");
          console.log("   Created: 10 Issues with assignments and resolutions");
          return [2 /*return*/];
      }
    });
  });
}
main()
  .catch(function (e) {
    console.error(e);
    process.exit(1);
  })
  .finally(function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, prisma_js_1.prisma.$disconnect()];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  });
