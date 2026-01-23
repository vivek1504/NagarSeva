import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Route
 *
 */
export type RouteModel = runtime.Types.Result.DefaultSelection<Prisma.$RoutePayload>;
export type AggregateRoute = {
    _count: RouteCountAggregateOutputType | null;
    _avg: RouteAvgAggregateOutputType | null;
    _sum: RouteSumAggregateOutputType | null;
    _min: RouteMinAggregateOutputType | null;
    _max: RouteMaxAggregateOutputType | null;
};
export type RouteAvgAggregateOutputType = {
    startLat: number | null;
    startLon: number | null;
    endLat: number | null;
    endLon: number | null;
    distance: number | null;
};
export type RouteSumAggregateOutputType = {
    startLat: number | null;
    startLon: number | null;
    endLat: number | null;
    endLon: number | null;
    distance: number | null;
};
export type RouteMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    wardId: string | null;
    startLat: number | null;
    startLon: number | null;
    endLat: number | null;
    endLon: number | null;
    distance: number | null;
};
export type RouteMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    wardId: string | null;
    startLat: number | null;
    startLon: number | null;
    endLat: number | null;
    endLon: number | null;
    distance: number | null;
};
export type RouteCountAggregateOutputType = {
    id: number;
    name: number;
    wardId: number;
    startLat: number;
    startLon: number;
    endLat: number;
    endLon: number;
    distance: number;
    _all: number;
};
export type RouteAvgAggregateInputType = {
    startLat?: true;
    startLon?: true;
    endLat?: true;
    endLon?: true;
    distance?: true;
};
export type RouteSumAggregateInputType = {
    startLat?: true;
    startLon?: true;
    endLat?: true;
    endLon?: true;
    distance?: true;
};
export type RouteMinAggregateInputType = {
    id?: true;
    name?: true;
    wardId?: true;
    startLat?: true;
    startLon?: true;
    endLat?: true;
    endLon?: true;
    distance?: true;
};
export type RouteMaxAggregateInputType = {
    id?: true;
    name?: true;
    wardId?: true;
    startLat?: true;
    startLon?: true;
    endLat?: true;
    endLon?: true;
    distance?: true;
};
export type RouteCountAggregateInputType = {
    id?: true;
    name?: true;
    wardId?: true;
    startLat?: true;
    startLon?: true;
    endLat?: true;
    endLon?: true;
    distance?: true;
    _all?: true;
};
export type RouteAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Route to aggregate.
     */
    where?: Prisma.RouteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Routes to fetch.
     */
    orderBy?: Prisma.RouteOrderByWithRelationInput | Prisma.RouteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.RouteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Routes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Routes
    **/
    _count?: true | RouteCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: RouteAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: RouteSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: RouteMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: RouteMaxAggregateInputType;
};
export type GetRouteAggregateType<T extends RouteAggregateArgs> = {
    [P in keyof T & keyof AggregateRoute]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRoute[P]> : Prisma.GetScalarType<T[P], AggregateRoute[P]>;
};
export type RouteGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RouteWhereInput;
    orderBy?: Prisma.RouteOrderByWithAggregationInput | Prisma.RouteOrderByWithAggregationInput[];
    by: Prisma.RouteScalarFieldEnum[] | Prisma.RouteScalarFieldEnum;
    having?: Prisma.RouteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RouteCountAggregateInputType | true;
    _avg?: RouteAvgAggregateInputType;
    _sum?: RouteSumAggregateInputType;
    _min?: RouteMinAggregateInputType;
    _max?: RouteMaxAggregateInputType;
};
export type RouteGroupByOutputType = {
    id: string;
    name: string;
    wardId: string;
    startLat: number;
    startLon: number;
    endLat: number;
    endLon: number;
    distance: number;
    _count: RouteCountAggregateOutputType | null;
    _avg: RouteAvgAggregateOutputType | null;
    _sum: RouteSumAggregateOutputType | null;
    _min: RouteMinAggregateOutputType | null;
    _max: RouteMaxAggregateOutputType | null;
};
type GetRouteGroupByPayload<T extends RouteGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RouteGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RouteGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RouteGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RouteGroupByOutputType[P]>;
}>>;
export type RouteWhereInput = {
    AND?: Prisma.RouteWhereInput | Prisma.RouteWhereInput[];
    OR?: Prisma.RouteWhereInput[];
    NOT?: Prisma.RouteWhereInput | Prisma.RouteWhereInput[];
    id?: Prisma.StringFilter<"Route"> | string;
    name?: Prisma.StringFilter<"Route"> | string;
    wardId?: Prisma.StringFilter<"Route"> | string;
    startLat?: Prisma.FloatFilter<"Route"> | number;
    startLon?: Prisma.FloatFilter<"Route"> | number;
    endLat?: Prisma.FloatFilter<"Route"> | number;
    endLon?: Prisma.FloatFilter<"Route"> | number;
    distance?: Prisma.FloatFilter<"Route"> | number;
    ward?: Prisma.XOR<Prisma.WardScalarRelationFilter, Prisma.WardWhereInput>;
    assignments?: Prisma.RouteAssignmentListRelationFilter;
    issues?: Prisma.IssueListRelationFilter;
};
export type RouteOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    wardId?: Prisma.SortOrder;
    startLat?: Prisma.SortOrder;
    startLon?: Prisma.SortOrder;
    endLat?: Prisma.SortOrder;
    endLon?: Prisma.SortOrder;
    distance?: Prisma.SortOrder;
    ward?: Prisma.WardOrderByWithRelationInput;
    assignments?: Prisma.RouteAssignmentOrderByRelationAggregateInput;
    issues?: Prisma.IssueOrderByRelationAggregateInput;
};
export type RouteWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RouteWhereInput | Prisma.RouteWhereInput[];
    OR?: Prisma.RouteWhereInput[];
    NOT?: Prisma.RouteWhereInput | Prisma.RouteWhereInput[];
    name?: Prisma.StringFilter<"Route"> | string;
    wardId?: Prisma.StringFilter<"Route"> | string;
    startLat?: Prisma.FloatFilter<"Route"> | number;
    startLon?: Prisma.FloatFilter<"Route"> | number;
    endLat?: Prisma.FloatFilter<"Route"> | number;
    endLon?: Prisma.FloatFilter<"Route"> | number;
    distance?: Prisma.FloatFilter<"Route"> | number;
    ward?: Prisma.XOR<Prisma.WardScalarRelationFilter, Prisma.WardWhereInput>;
    assignments?: Prisma.RouteAssignmentListRelationFilter;
    issues?: Prisma.IssueListRelationFilter;
}, "id">;
export type RouteOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    wardId?: Prisma.SortOrder;
    startLat?: Prisma.SortOrder;
    startLon?: Prisma.SortOrder;
    endLat?: Prisma.SortOrder;
    endLon?: Prisma.SortOrder;
    distance?: Prisma.SortOrder;
    _count?: Prisma.RouteCountOrderByAggregateInput;
    _avg?: Prisma.RouteAvgOrderByAggregateInput;
    _max?: Prisma.RouteMaxOrderByAggregateInput;
    _min?: Prisma.RouteMinOrderByAggregateInput;
    _sum?: Prisma.RouteSumOrderByAggregateInput;
};
export type RouteScalarWhereWithAggregatesInput = {
    AND?: Prisma.RouteScalarWhereWithAggregatesInput | Prisma.RouteScalarWhereWithAggregatesInput[];
    OR?: Prisma.RouteScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RouteScalarWhereWithAggregatesInput | Prisma.RouteScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Route"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Route"> | string;
    wardId?: Prisma.StringWithAggregatesFilter<"Route"> | string;
    startLat?: Prisma.FloatWithAggregatesFilter<"Route"> | number;
    startLon?: Prisma.FloatWithAggregatesFilter<"Route"> | number;
    endLat?: Prisma.FloatWithAggregatesFilter<"Route"> | number;
    endLon?: Prisma.FloatWithAggregatesFilter<"Route"> | number;
    distance?: Prisma.FloatWithAggregatesFilter<"Route"> | number;
};
export type RouteCreateInput = {
    id?: string;
    name: string;
    startLat: number;
    startLon: number;
    endLat: number;
    endLon: number;
    distance: number;
    ward: Prisma.WardCreateNestedOneWithoutRoutesInput;
    assignments?: Prisma.RouteAssignmentCreateNestedManyWithoutRouteInput;
    issues?: Prisma.IssueCreateNestedManyWithoutRouteInput;
};
export type RouteUncheckedCreateInput = {
    id?: string;
    name: string;
    wardId: string;
    startLat: number;
    startLon: number;
    endLat: number;
    endLon: number;
    distance: number;
    assignments?: Prisma.RouteAssignmentUncheckedCreateNestedManyWithoutRouteInput;
    issues?: Prisma.IssueUncheckedCreateNestedManyWithoutRouteInput;
};
export type RouteUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    startLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    startLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
    ward?: Prisma.WardUpdateOneRequiredWithoutRoutesNestedInput;
    assignments?: Prisma.RouteAssignmentUpdateManyWithoutRouteNestedInput;
    issues?: Prisma.IssueUpdateManyWithoutRouteNestedInput;
};
export type RouteUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    wardId?: Prisma.StringFieldUpdateOperationsInput | string;
    startLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    startLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
    assignments?: Prisma.RouteAssignmentUncheckedUpdateManyWithoutRouteNestedInput;
    issues?: Prisma.IssueUncheckedUpdateManyWithoutRouteNestedInput;
};
export type RouteCreateManyInput = {
    id?: string;
    name: string;
    wardId: string;
    startLat: number;
    startLon: number;
    endLat: number;
    endLon: number;
    distance: number;
};
export type RouteUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    startLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    startLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type RouteUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    wardId?: Prisma.StringFieldUpdateOperationsInput | string;
    startLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    startLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type RouteListRelationFilter = {
    every?: Prisma.RouteWhereInput;
    some?: Prisma.RouteWhereInput;
    none?: Prisma.RouteWhereInput;
};
export type RouteOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RouteCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    wardId?: Prisma.SortOrder;
    startLat?: Prisma.SortOrder;
    startLon?: Prisma.SortOrder;
    endLat?: Prisma.SortOrder;
    endLon?: Prisma.SortOrder;
    distance?: Prisma.SortOrder;
};
export type RouteAvgOrderByAggregateInput = {
    startLat?: Prisma.SortOrder;
    startLon?: Prisma.SortOrder;
    endLat?: Prisma.SortOrder;
    endLon?: Prisma.SortOrder;
    distance?: Prisma.SortOrder;
};
export type RouteMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    wardId?: Prisma.SortOrder;
    startLat?: Prisma.SortOrder;
    startLon?: Prisma.SortOrder;
    endLat?: Prisma.SortOrder;
    endLon?: Prisma.SortOrder;
    distance?: Prisma.SortOrder;
};
export type RouteMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    wardId?: Prisma.SortOrder;
    startLat?: Prisma.SortOrder;
    startLon?: Prisma.SortOrder;
    endLat?: Prisma.SortOrder;
    endLon?: Prisma.SortOrder;
    distance?: Prisma.SortOrder;
};
export type RouteSumOrderByAggregateInput = {
    startLat?: Prisma.SortOrder;
    startLon?: Prisma.SortOrder;
    endLat?: Prisma.SortOrder;
    endLon?: Prisma.SortOrder;
    distance?: Prisma.SortOrder;
};
export type RouteScalarRelationFilter = {
    is?: Prisma.RouteWhereInput;
    isNot?: Prisma.RouteWhereInput;
};
export type RouteCreateNestedManyWithoutWardInput = {
    create?: Prisma.XOR<Prisma.RouteCreateWithoutWardInput, Prisma.RouteUncheckedCreateWithoutWardInput> | Prisma.RouteCreateWithoutWardInput[] | Prisma.RouteUncheckedCreateWithoutWardInput[];
    connectOrCreate?: Prisma.RouteCreateOrConnectWithoutWardInput | Prisma.RouteCreateOrConnectWithoutWardInput[];
    createMany?: Prisma.RouteCreateManyWardInputEnvelope;
    connect?: Prisma.RouteWhereUniqueInput | Prisma.RouteWhereUniqueInput[];
};
export type RouteUncheckedCreateNestedManyWithoutWardInput = {
    create?: Prisma.XOR<Prisma.RouteCreateWithoutWardInput, Prisma.RouteUncheckedCreateWithoutWardInput> | Prisma.RouteCreateWithoutWardInput[] | Prisma.RouteUncheckedCreateWithoutWardInput[];
    connectOrCreate?: Prisma.RouteCreateOrConnectWithoutWardInput | Prisma.RouteCreateOrConnectWithoutWardInput[];
    createMany?: Prisma.RouteCreateManyWardInputEnvelope;
    connect?: Prisma.RouteWhereUniqueInput | Prisma.RouteWhereUniqueInput[];
};
export type RouteUpdateManyWithoutWardNestedInput = {
    create?: Prisma.XOR<Prisma.RouteCreateWithoutWardInput, Prisma.RouteUncheckedCreateWithoutWardInput> | Prisma.RouteCreateWithoutWardInput[] | Prisma.RouteUncheckedCreateWithoutWardInput[];
    connectOrCreate?: Prisma.RouteCreateOrConnectWithoutWardInput | Prisma.RouteCreateOrConnectWithoutWardInput[];
    upsert?: Prisma.RouteUpsertWithWhereUniqueWithoutWardInput | Prisma.RouteUpsertWithWhereUniqueWithoutWardInput[];
    createMany?: Prisma.RouteCreateManyWardInputEnvelope;
    set?: Prisma.RouteWhereUniqueInput | Prisma.RouteWhereUniqueInput[];
    disconnect?: Prisma.RouteWhereUniqueInput | Prisma.RouteWhereUniqueInput[];
    delete?: Prisma.RouteWhereUniqueInput | Prisma.RouteWhereUniqueInput[];
    connect?: Prisma.RouteWhereUniqueInput | Prisma.RouteWhereUniqueInput[];
    update?: Prisma.RouteUpdateWithWhereUniqueWithoutWardInput | Prisma.RouteUpdateWithWhereUniqueWithoutWardInput[];
    updateMany?: Prisma.RouteUpdateManyWithWhereWithoutWardInput | Prisma.RouteUpdateManyWithWhereWithoutWardInput[];
    deleteMany?: Prisma.RouteScalarWhereInput | Prisma.RouteScalarWhereInput[];
};
export type RouteUncheckedUpdateManyWithoutWardNestedInput = {
    create?: Prisma.XOR<Prisma.RouteCreateWithoutWardInput, Prisma.RouteUncheckedCreateWithoutWardInput> | Prisma.RouteCreateWithoutWardInput[] | Prisma.RouteUncheckedCreateWithoutWardInput[];
    connectOrCreate?: Prisma.RouteCreateOrConnectWithoutWardInput | Prisma.RouteCreateOrConnectWithoutWardInput[];
    upsert?: Prisma.RouteUpsertWithWhereUniqueWithoutWardInput | Prisma.RouteUpsertWithWhereUniqueWithoutWardInput[];
    createMany?: Prisma.RouteCreateManyWardInputEnvelope;
    set?: Prisma.RouteWhereUniqueInput | Prisma.RouteWhereUniqueInput[];
    disconnect?: Prisma.RouteWhereUniqueInput | Prisma.RouteWhereUniqueInput[];
    delete?: Prisma.RouteWhereUniqueInput | Prisma.RouteWhereUniqueInput[];
    connect?: Prisma.RouteWhereUniqueInput | Prisma.RouteWhereUniqueInput[];
    update?: Prisma.RouteUpdateWithWhereUniqueWithoutWardInput | Prisma.RouteUpdateWithWhereUniqueWithoutWardInput[];
    updateMany?: Prisma.RouteUpdateManyWithWhereWithoutWardInput | Prisma.RouteUpdateManyWithWhereWithoutWardInput[];
    deleteMany?: Prisma.RouteScalarWhereInput | Prisma.RouteScalarWhereInput[];
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type RouteCreateNestedOneWithoutAssignmentsInput = {
    create?: Prisma.XOR<Prisma.RouteCreateWithoutAssignmentsInput, Prisma.RouteUncheckedCreateWithoutAssignmentsInput>;
    connectOrCreate?: Prisma.RouteCreateOrConnectWithoutAssignmentsInput;
    connect?: Prisma.RouteWhereUniqueInput;
};
export type RouteUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: Prisma.XOR<Prisma.RouteCreateWithoutAssignmentsInput, Prisma.RouteUncheckedCreateWithoutAssignmentsInput>;
    connectOrCreate?: Prisma.RouteCreateOrConnectWithoutAssignmentsInput;
    upsert?: Prisma.RouteUpsertWithoutAssignmentsInput;
    connect?: Prisma.RouteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RouteUpdateToOneWithWhereWithoutAssignmentsInput, Prisma.RouteUpdateWithoutAssignmentsInput>, Prisma.RouteUncheckedUpdateWithoutAssignmentsInput>;
};
export type RouteCreateNestedOneWithoutIssuesInput = {
    create?: Prisma.XOR<Prisma.RouteCreateWithoutIssuesInput, Prisma.RouteUncheckedCreateWithoutIssuesInput>;
    connectOrCreate?: Prisma.RouteCreateOrConnectWithoutIssuesInput;
    connect?: Prisma.RouteWhereUniqueInput;
};
export type RouteUpdateOneRequiredWithoutIssuesNestedInput = {
    create?: Prisma.XOR<Prisma.RouteCreateWithoutIssuesInput, Prisma.RouteUncheckedCreateWithoutIssuesInput>;
    connectOrCreate?: Prisma.RouteCreateOrConnectWithoutIssuesInput;
    upsert?: Prisma.RouteUpsertWithoutIssuesInput;
    connect?: Prisma.RouteWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RouteUpdateToOneWithWhereWithoutIssuesInput, Prisma.RouteUpdateWithoutIssuesInput>, Prisma.RouteUncheckedUpdateWithoutIssuesInput>;
};
export type RouteCreateWithoutWardInput = {
    id?: string;
    name: string;
    startLat: number;
    startLon: number;
    endLat: number;
    endLon: number;
    distance: number;
    assignments?: Prisma.RouteAssignmentCreateNestedManyWithoutRouteInput;
    issues?: Prisma.IssueCreateNestedManyWithoutRouteInput;
};
export type RouteUncheckedCreateWithoutWardInput = {
    id?: string;
    name: string;
    startLat: number;
    startLon: number;
    endLat: number;
    endLon: number;
    distance: number;
    assignments?: Prisma.RouteAssignmentUncheckedCreateNestedManyWithoutRouteInput;
    issues?: Prisma.IssueUncheckedCreateNestedManyWithoutRouteInput;
};
export type RouteCreateOrConnectWithoutWardInput = {
    where: Prisma.RouteWhereUniqueInput;
    create: Prisma.XOR<Prisma.RouteCreateWithoutWardInput, Prisma.RouteUncheckedCreateWithoutWardInput>;
};
export type RouteCreateManyWardInputEnvelope = {
    data: Prisma.RouteCreateManyWardInput | Prisma.RouteCreateManyWardInput[];
    skipDuplicates?: boolean;
};
export type RouteUpsertWithWhereUniqueWithoutWardInput = {
    where: Prisma.RouteWhereUniqueInput;
    update: Prisma.XOR<Prisma.RouteUpdateWithoutWardInput, Prisma.RouteUncheckedUpdateWithoutWardInput>;
    create: Prisma.XOR<Prisma.RouteCreateWithoutWardInput, Prisma.RouteUncheckedCreateWithoutWardInput>;
};
export type RouteUpdateWithWhereUniqueWithoutWardInput = {
    where: Prisma.RouteWhereUniqueInput;
    data: Prisma.XOR<Prisma.RouteUpdateWithoutWardInput, Prisma.RouteUncheckedUpdateWithoutWardInput>;
};
export type RouteUpdateManyWithWhereWithoutWardInput = {
    where: Prisma.RouteScalarWhereInput;
    data: Prisma.XOR<Prisma.RouteUpdateManyMutationInput, Prisma.RouteUncheckedUpdateManyWithoutWardInput>;
};
export type RouteScalarWhereInput = {
    AND?: Prisma.RouteScalarWhereInput | Prisma.RouteScalarWhereInput[];
    OR?: Prisma.RouteScalarWhereInput[];
    NOT?: Prisma.RouteScalarWhereInput | Prisma.RouteScalarWhereInput[];
    id?: Prisma.StringFilter<"Route"> | string;
    name?: Prisma.StringFilter<"Route"> | string;
    wardId?: Prisma.StringFilter<"Route"> | string;
    startLat?: Prisma.FloatFilter<"Route"> | number;
    startLon?: Prisma.FloatFilter<"Route"> | number;
    endLat?: Prisma.FloatFilter<"Route"> | number;
    endLon?: Prisma.FloatFilter<"Route"> | number;
    distance?: Prisma.FloatFilter<"Route"> | number;
};
export type RouteCreateWithoutAssignmentsInput = {
    id?: string;
    name: string;
    startLat: number;
    startLon: number;
    endLat: number;
    endLon: number;
    distance: number;
    ward: Prisma.WardCreateNestedOneWithoutRoutesInput;
    issues?: Prisma.IssueCreateNestedManyWithoutRouteInput;
};
export type RouteUncheckedCreateWithoutAssignmentsInput = {
    id?: string;
    name: string;
    wardId: string;
    startLat: number;
    startLon: number;
    endLat: number;
    endLon: number;
    distance: number;
    issues?: Prisma.IssueUncheckedCreateNestedManyWithoutRouteInput;
};
export type RouteCreateOrConnectWithoutAssignmentsInput = {
    where: Prisma.RouteWhereUniqueInput;
    create: Prisma.XOR<Prisma.RouteCreateWithoutAssignmentsInput, Prisma.RouteUncheckedCreateWithoutAssignmentsInput>;
};
export type RouteUpsertWithoutAssignmentsInput = {
    update: Prisma.XOR<Prisma.RouteUpdateWithoutAssignmentsInput, Prisma.RouteUncheckedUpdateWithoutAssignmentsInput>;
    create: Prisma.XOR<Prisma.RouteCreateWithoutAssignmentsInput, Prisma.RouteUncheckedCreateWithoutAssignmentsInput>;
    where?: Prisma.RouteWhereInput;
};
export type RouteUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: Prisma.RouteWhereInput;
    data: Prisma.XOR<Prisma.RouteUpdateWithoutAssignmentsInput, Prisma.RouteUncheckedUpdateWithoutAssignmentsInput>;
};
export type RouteUpdateWithoutAssignmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    startLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    startLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
    ward?: Prisma.WardUpdateOneRequiredWithoutRoutesNestedInput;
    issues?: Prisma.IssueUpdateManyWithoutRouteNestedInput;
};
export type RouteUncheckedUpdateWithoutAssignmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    wardId?: Prisma.StringFieldUpdateOperationsInput | string;
    startLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    startLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
    issues?: Prisma.IssueUncheckedUpdateManyWithoutRouteNestedInput;
};
export type RouteCreateWithoutIssuesInput = {
    id?: string;
    name: string;
    startLat: number;
    startLon: number;
    endLat: number;
    endLon: number;
    distance: number;
    ward: Prisma.WardCreateNestedOneWithoutRoutesInput;
    assignments?: Prisma.RouteAssignmentCreateNestedManyWithoutRouteInput;
};
export type RouteUncheckedCreateWithoutIssuesInput = {
    id?: string;
    name: string;
    wardId: string;
    startLat: number;
    startLon: number;
    endLat: number;
    endLon: number;
    distance: number;
    assignments?: Prisma.RouteAssignmentUncheckedCreateNestedManyWithoutRouteInput;
};
export type RouteCreateOrConnectWithoutIssuesInput = {
    where: Prisma.RouteWhereUniqueInput;
    create: Prisma.XOR<Prisma.RouteCreateWithoutIssuesInput, Prisma.RouteUncheckedCreateWithoutIssuesInput>;
};
export type RouteUpsertWithoutIssuesInput = {
    update: Prisma.XOR<Prisma.RouteUpdateWithoutIssuesInput, Prisma.RouteUncheckedUpdateWithoutIssuesInput>;
    create: Prisma.XOR<Prisma.RouteCreateWithoutIssuesInput, Prisma.RouteUncheckedCreateWithoutIssuesInput>;
    where?: Prisma.RouteWhereInput;
};
export type RouteUpdateToOneWithWhereWithoutIssuesInput = {
    where?: Prisma.RouteWhereInput;
    data: Prisma.XOR<Prisma.RouteUpdateWithoutIssuesInput, Prisma.RouteUncheckedUpdateWithoutIssuesInput>;
};
export type RouteUpdateWithoutIssuesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    startLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    startLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
    ward?: Prisma.WardUpdateOneRequiredWithoutRoutesNestedInput;
    assignments?: Prisma.RouteAssignmentUpdateManyWithoutRouteNestedInput;
};
export type RouteUncheckedUpdateWithoutIssuesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    wardId?: Prisma.StringFieldUpdateOperationsInput | string;
    startLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    startLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
    assignments?: Prisma.RouteAssignmentUncheckedUpdateManyWithoutRouteNestedInput;
};
export type RouteCreateManyWardInput = {
    id?: string;
    name: string;
    startLat: number;
    startLon: number;
    endLat: number;
    endLon: number;
    distance: number;
};
export type RouteUpdateWithoutWardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    startLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    startLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
    assignments?: Prisma.RouteAssignmentUpdateManyWithoutRouteNestedInput;
    issues?: Prisma.IssueUpdateManyWithoutRouteNestedInput;
};
export type RouteUncheckedUpdateWithoutWardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    startLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    startLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
    assignments?: Prisma.RouteAssignmentUncheckedUpdateManyWithoutRouteNestedInput;
    issues?: Prisma.IssueUncheckedUpdateManyWithoutRouteNestedInput;
};
export type RouteUncheckedUpdateManyWithoutWardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    startLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    startLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLat?: Prisma.FloatFieldUpdateOperationsInput | number;
    endLon?: Prisma.FloatFieldUpdateOperationsInput | number;
    distance?: Prisma.FloatFieldUpdateOperationsInput | number;
};
/**
 * Count Type RouteCountOutputType
 */
export type RouteCountOutputType = {
    assignments: number;
    issues: number;
};
export type RouteCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assignments?: boolean | RouteCountOutputTypeCountAssignmentsArgs;
    issues?: boolean | RouteCountOutputTypeCountIssuesArgs;
};
/**
 * RouteCountOutputType without action
 */
export type RouteCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteCountOutputType
     */
    select?: Prisma.RouteCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * RouteCountOutputType without action
 */
export type RouteCountOutputTypeCountAssignmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RouteAssignmentWhereInput;
};
/**
 * RouteCountOutputType without action
 */
export type RouteCountOutputTypeCountIssuesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IssueWhereInput;
};
export type RouteSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    wardId?: boolean;
    startLat?: boolean;
    startLon?: boolean;
    endLat?: boolean;
    endLon?: boolean;
    distance?: boolean;
    ward?: boolean | Prisma.WardDefaultArgs<ExtArgs>;
    assignments?: boolean | Prisma.Route$assignmentsArgs<ExtArgs>;
    issues?: boolean | Prisma.Route$issuesArgs<ExtArgs>;
    _count?: boolean | Prisma.RouteCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["route"]>;
export type RouteSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    wardId?: boolean;
    startLat?: boolean;
    startLon?: boolean;
    endLat?: boolean;
    endLon?: boolean;
    distance?: boolean;
    ward?: boolean | Prisma.WardDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["route"]>;
export type RouteSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    wardId?: boolean;
    startLat?: boolean;
    startLon?: boolean;
    endLat?: boolean;
    endLon?: boolean;
    distance?: boolean;
    ward?: boolean | Prisma.WardDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["route"]>;
export type RouteSelectScalar = {
    id?: boolean;
    name?: boolean;
    wardId?: boolean;
    startLat?: boolean;
    startLon?: boolean;
    endLat?: boolean;
    endLon?: boolean;
    distance?: boolean;
};
export type RouteOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "wardId" | "startLat" | "startLon" | "endLat" | "endLon" | "distance", ExtArgs["result"]["route"]>;
export type RouteInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ward?: boolean | Prisma.WardDefaultArgs<ExtArgs>;
    assignments?: boolean | Prisma.Route$assignmentsArgs<ExtArgs>;
    issues?: boolean | Prisma.Route$issuesArgs<ExtArgs>;
    _count?: boolean | Prisma.RouteCountOutputTypeDefaultArgs<ExtArgs>;
};
export type RouteIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ward?: boolean | Prisma.WardDefaultArgs<ExtArgs>;
};
export type RouteIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ward?: boolean | Prisma.WardDefaultArgs<ExtArgs>;
};
export type $RoutePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Route";
    objects: {
        ward: Prisma.$WardPayload<ExtArgs>;
        assignments: Prisma.$RouteAssignmentPayload<ExtArgs>[];
        issues: Prisma.$IssuePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        wardId: string;
        startLat: number;
        startLon: number;
        endLat: number;
        endLon: number;
        distance: number;
    }, ExtArgs["result"]["route"]>;
    composites: {};
};
export type RouteGetPayload<S extends boolean | null | undefined | RouteDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RoutePayload, S>;
export type RouteCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RouteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RouteCountAggregateInputType | true;
};
export interface RouteDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Route'];
        meta: {
            name: 'Route';
        };
    };
    /**
     * Find zero or one Route that matches the filter.
     * @param {RouteFindUniqueArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RouteFindUniqueArgs>(args: Prisma.SelectSubset<T, RouteFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RouteClient<runtime.Types.Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Route that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RouteFindUniqueOrThrowArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RouteFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RouteFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RouteClient<runtime.Types.Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Route that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindFirstArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RouteFindFirstArgs>(args?: Prisma.SelectSubset<T, RouteFindFirstArgs<ExtArgs>>): Prisma.Prisma__RouteClient<runtime.Types.Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Route that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindFirstOrThrowArgs} args - Arguments to find a Route
     * @example
     * // Get one Route
     * const route = await prisma.route.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RouteFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RouteFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RouteClient<runtime.Types.Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Routes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Routes
     * const routes = await prisma.route.findMany()
     *
     * // Get first 10 Routes
     * const routes = await prisma.route.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const routeWithIdOnly = await prisma.route.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RouteFindManyArgs>(args?: Prisma.SelectSubset<T, RouteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Route.
     * @param {RouteCreateArgs} args - Arguments to create a Route.
     * @example
     * // Create one Route
     * const Route = await prisma.route.create({
     *   data: {
     *     // ... data to create a Route
     *   }
     * })
     *
     */
    create<T extends RouteCreateArgs>(args: Prisma.SelectSubset<T, RouteCreateArgs<ExtArgs>>): Prisma.Prisma__RouteClient<runtime.Types.Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Routes.
     * @param {RouteCreateManyArgs} args - Arguments to create many Routes.
     * @example
     * // Create many Routes
     * const route = await prisma.route.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RouteCreateManyArgs>(args?: Prisma.SelectSubset<T, RouteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Routes and returns the data saved in the database.
     * @param {RouteCreateManyAndReturnArgs} args - Arguments to create many Routes.
     * @example
     * // Create many Routes
     * const route = await prisma.route.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Routes and only return the `id`
     * const routeWithIdOnly = await prisma.route.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RouteCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RouteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Route.
     * @param {RouteDeleteArgs} args - Arguments to delete one Route.
     * @example
     * // Delete one Route
     * const Route = await prisma.route.delete({
     *   where: {
     *     // ... filter to delete one Route
     *   }
     * })
     *
     */
    delete<T extends RouteDeleteArgs>(args: Prisma.SelectSubset<T, RouteDeleteArgs<ExtArgs>>): Prisma.Prisma__RouteClient<runtime.Types.Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Route.
     * @param {RouteUpdateArgs} args - Arguments to update one Route.
     * @example
     * // Update one Route
     * const route = await prisma.route.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RouteUpdateArgs>(args: Prisma.SelectSubset<T, RouteUpdateArgs<ExtArgs>>): Prisma.Prisma__RouteClient<runtime.Types.Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Routes.
     * @param {RouteDeleteManyArgs} args - Arguments to filter Routes to delete.
     * @example
     * // Delete a few Routes
     * const { count } = await prisma.route.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RouteDeleteManyArgs>(args?: Prisma.SelectSubset<T, RouteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Routes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Routes
     * const route = await prisma.route.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RouteUpdateManyArgs>(args: Prisma.SelectSubset<T, RouteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Routes and returns the data updated in the database.
     * @param {RouteUpdateManyAndReturnArgs} args - Arguments to update many Routes.
     * @example
     * // Update many Routes
     * const route = await prisma.route.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Routes and only return the `id`
     * const routeWithIdOnly = await prisma.route.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends RouteUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RouteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Route.
     * @param {RouteUpsertArgs} args - Arguments to update or create a Route.
     * @example
     * // Update or create a Route
     * const route = await prisma.route.upsert({
     *   create: {
     *     // ... data to create a Route
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Route we want to update
     *   }
     * })
     */
    upsert<T extends RouteUpsertArgs>(args: Prisma.SelectSubset<T, RouteUpsertArgs<ExtArgs>>): Prisma.Prisma__RouteClient<runtime.Types.Result.GetResult<Prisma.$RoutePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Routes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteCountArgs} args - Arguments to filter Routes to count.
     * @example
     * // Count the number of Routes
     * const count = await prisma.route.count({
     *   where: {
     *     // ... the filter for the Routes we want to count
     *   }
     * })
    **/
    count<T extends RouteCountArgs>(args?: Prisma.Subset<T, RouteCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RouteCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Route.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RouteAggregateArgs>(args: Prisma.Subset<T, RouteAggregateArgs>): Prisma.PrismaPromise<GetRouteAggregateType<T>>;
    /**
     * Group by Route.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends RouteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RouteGroupByArgs['orderBy'];
    } : {
        orderBy?: RouteGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RouteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRouteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Route model
     */
    readonly fields: RouteFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Route.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__RouteClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ward<T extends Prisma.WardDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WardDefaultArgs<ExtArgs>>): Prisma.Prisma__WardClient<runtime.Types.Result.GetResult<Prisma.$WardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    assignments<T extends Prisma.Route$assignmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Route$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RouteAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    issues<T extends Prisma.Route$issuesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Route$issuesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Route model
 */
export interface RouteFieldRefs {
    readonly id: Prisma.FieldRef<"Route", 'String'>;
    readonly name: Prisma.FieldRef<"Route", 'String'>;
    readonly wardId: Prisma.FieldRef<"Route", 'String'>;
    readonly startLat: Prisma.FieldRef<"Route", 'Float'>;
    readonly startLon: Prisma.FieldRef<"Route", 'Float'>;
    readonly endLat: Prisma.FieldRef<"Route", 'Float'>;
    readonly endLon: Prisma.FieldRef<"Route", 'Float'>;
    readonly distance: Prisma.FieldRef<"Route", 'Float'>;
}
/**
 * Route findUnique
 */
export type RouteFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: Prisma.RouteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Route
     */
    omit?: Prisma.RouteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RouteInclude<ExtArgs> | null;
    /**
     * Filter, which Route to fetch.
     */
    where: Prisma.RouteWhereUniqueInput;
};
/**
 * Route findUniqueOrThrow
 */
export type RouteFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: Prisma.RouteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Route
     */
    omit?: Prisma.RouteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RouteInclude<ExtArgs> | null;
    /**
     * Filter, which Route to fetch.
     */
    where: Prisma.RouteWhereUniqueInput;
};
/**
 * Route findFirst
 */
export type RouteFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: Prisma.RouteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Route
     */
    omit?: Prisma.RouteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RouteInclude<ExtArgs> | null;
    /**
     * Filter, which Route to fetch.
     */
    where?: Prisma.RouteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Routes to fetch.
     */
    orderBy?: Prisma.RouteOrderByWithRelationInput | Prisma.RouteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Routes.
     */
    cursor?: Prisma.RouteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Routes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Routes.
     */
    distinct?: Prisma.RouteScalarFieldEnum | Prisma.RouteScalarFieldEnum[];
};
/**
 * Route findFirstOrThrow
 */
export type RouteFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: Prisma.RouteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Route
     */
    omit?: Prisma.RouteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RouteInclude<ExtArgs> | null;
    /**
     * Filter, which Route to fetch.
     */
    where?: Prisma.RouteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Routes to fetch.
     */
    orderBy?: Prisma.RouteOrderByWithRelationInput | Prisma.RouteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Routes.
     */
    cursor?: Prisma.RouteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Routes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Routes.
     */
    distinct?: Prisma.RouteScalarFieldEnum | Prisma.RouteScalarFieldEnum[];
};
/**
 * Route findMany
 */
export type RouteFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: Prisma.RouteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Route
     */
    omit?: Prisma.RouteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RouteInclude<ExtArgs> | null;
    /**
     * Filter, which Routes to fetch.
     */
    where?: Prisma.RouteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Routes to fetch.
     */
    orderBy?: Prisma.RouteOrderByWithRelationInput | Prisma.RouteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Routes.
     */
    cursor?: Prisma.RouteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Routes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Routes.
     */
    skip?: number;
    distinct?: Prisma.RouteScalarFieldEnum | Prisma.RouteScalarFieldEnum[];
};
/**
 * Route create
 */
export type RouteCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: Prisma.RouteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Route
     */
    omit?: Prisma.RouteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RouteInclude<ExtArgs> | null;
    /**
     * The data needed to create a Route.
     */
    data: Prisma.XOR<Prisma.RouteCreateInput, Prisma.RouteUncheckedCreateInput>;
};
/**
 * Route createMany
 */
export type RouteCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Routes.
     */
    data: Prisma.RouteCreateManyInput | Prisma.RouteCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Route createManyAndReturn
 */
export type RouteCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: Prisma.RouteSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Route
     */
    omit?: Prisma.RouteOmit<ExtArgs> | null;
    /**
     * The data used to create many Routes.
     */
    data: Prisma.RouteCreateManyInput | Prisma.RouteCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RouteIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Route update
 */
export type RouteUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: Prisma.RouteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Route
     */
    omit?: Prisma.RouteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RouteInclude<ExtArgs> | null;
    /**
     * The data needed to update a Route.
     */
    data: Prisma.XOR<Prisma.RouteUpdateInput, Prisma.RouteUncheckedUpdateInput>;
    /**
     * Choose, which Route to update.
     */
    where: Prisma.RouteWhereUniqueInput;
};
/**
 * Route updateMany
 */
export type RouteUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Routes.
     */
    data: Prisma.XOR<Prisma.RouteUpdateManyMutationInput, Prisma.RouteUncheckedUpdateManyInput>;
    /**
     * Filter which Routes to update
     */
    where?: Prisma.RouteWhereInput;
    /**
     * Limit how many Routes to update.
     */
    limit?: number;
};
/**
 * Route updateManyAndReturn
 */
export type RouteUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: Prisma.RouteSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Route
     */
    omit?: Prisma.RouteOmit<ExtArgs> | null;
    /**
     * The data used to update Routes.
     */
    data: Prisma.XOR<Prisma.RouteUpdateManyMutationInput, Prisma.RouteUncheckedUpdateManyInput>;
    /**
     * Filter which Routes to update
     */
    where?: Prisma.RouteWhereInput;
    /**
     * Limit how many Routes to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RouteIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Route upsert
 */
export type RouteUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: Prisma.RouteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Route
     */
    omit?: Prisma.RouteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RouteInclude<ExtArgs> | null;
    /**
     * The filter to search for the Route to update in case it exists.
     */
    where: Prisma.RouteWhereUniqueInput;
    /**
     * In case the Route found by the `where` argument doesn't exist, create a new Route with this data.
     */
    create: Prisma.XOR<Prisma.RouteCreateInput, Prisma.RouteUncheckedCreateInput>;
    /**
     * In case the Route was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.RouteUpdateInput, Prisma.RouteUncheckedUpdateInput>;
};
/**
 * Route delete
 */
export type RouteDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: Prisma.RouteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Route
     */
    omit?: Prisma.RouteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RouteInclude<ExtArgs> | null;
    /**
     * Filter which Route to delete.
     */
    where: Prisma.RouteWhereUniqueInput;
};
/**
 * Route deleteMany
 */
export type RouteDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Routes to delete
     */
    where?: Prisma.RouteWhereInput;
    /**
     * Limit how many Routes to delete.
     */
    limit?: number;
};
/**
 * Route.assignments
 */
export type Route$assignmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouteAssignment
     */
    select?: Prisma.RouteAssignmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RouteAssignment
     */
    omit?: Prisma.RouteAssignmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RouteAssignmentInclude<ExtArgs> | null;
    where?: Prisma.RouteAssignmentWhereInput;
    orderBy?: Prisma.RouteAssignmentOrderByWithRelationInput | Prisma.RouteAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.RouteAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RouteAssignmentScalarFieldEnum | Prisma.RouteAssignmentScalarFieldEnum[];
};
/**
 * Route.issues
 */
export type Route$issuesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Issue
     */
    select?: Prisma.IssueSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Issue
     */
    omit?: Prisma.IssueOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IssueInclude<ExtArgs> | null;
    where?: Prisma.IssueWhereInput;
    orderBy?: Prisma.IssueOrderByWithRelationInput | Prisma.IssueOrderByWithRelationInput[];
    cursor?: Prisma.IssueWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IssueScalarFieldEnum | Prisma.IssueScalarFieldEnum[];
};
/**
 * Route without action
 */
export type RouteDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Route
     */
    select?: Prisma.RouteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Route
     */
    omit?: Prisma.RouteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RouteInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Route.d.ts.map