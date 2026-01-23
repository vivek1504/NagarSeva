import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model IssueAssignment
 *
 */
export type IssueAssignmentModel = runtime.Types.Result.DefaultSelection<Prisma.$IssueAssignmentPayload>;
export type AggregateIssueAssignment = {
    _count: IssueAssignmentCountAggregateOutputType | null;
    _min: IssueAssignmentMinAggregateOutputType | null;
    _max: IssueAssignmentMaxAggregateOutputType | null;
};
export type IssueAssignmentMinAggregateOutputType = {
    id: string | null;
    issueId: string | null;
    engineerId: string | null;
    assignedAt: Date | null;
};
export type IssueAssignmentMaxAggregateOutputType = {
    id: string | null;
    issueId: string | null;
    engineerId: string | null;
    assignedAt: Date | null;
};
export type IssueAssignmentCountAggregateOutputType = {
    id: number;
    issueId: number;
    engineerId: number;
    assignedAt: number;
    _all: number;
};
export type IssueAssignmentMinAggregateInputType = {
    id?: true;
    issueId?: true;
    engineerId?: true;
    assignedAt?: true;
};
export type IssueAssignmentMaxAggregateInputType = {
    id?: true;
    issueId?: true;
    engineerId?: true;
    assignedAt?: true;
};
export type IssueAssignmentCountAggregateInputType = {
    id?: true;
    issueId?: true;
    engineerId?: true;
    assignedAt?: true;
    _all?: true;
};
export type IssueAssignmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which IssueAssignment to aggregate.
     */
    where?: Prisma.IssueAssignmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of IssueAssignments to fetch.
     */
    orderBy?: Prisma.IssueAssignmentOrderByWithRelationInput | Prisma.IssueAssignmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.IssueAssignmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` IssueAssignments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` IssueAssignments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned IssueAssignments
    **/
    _count?: true | IssueAssignmentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: IssueAssignmentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: IssueAssignmentMaxAggregateInputType;
};
export type GetIssueAssignmentAggregateType<T extends IssueAssignmentAggregateArgs> = {
    [P in keyof T & keyof AggregateIssueAssignment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIssueAssignment[P]> : Prisma.GetScalarType<T[P], AggregateIssueAssignment[P]>;
};
export type IssueAssignmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IssueAssignmentWhereInput;
    orderBy?: Prisma.IssueAssignmentOrderByWithAggregationInput | Prisma.IssueAssignmentOrderByWithAggregationInput[];
    by: Prisma.IssueAssignmentScalarFieldEnum[] | Prisma.IssueAssignmentScalarFieldEnum;
    having?: Prisma.IssueAssignmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IssueAssignmentCountAggregateInputType | true;
    _min?: IssueAssignmentMinAggregateInputType;
    _max?: IssueAssignmentMaxAggregateInputType;
};
export type IssueAssignmentGroupByOutputType = {
    id: string;
    issueId: string;
    engineerId: string;
    assignedAt: Date;
    _count: IssueAssignmentCountAggregateOutputType | null;
    _min: IssueAssignmentMinAggregateOutputType | null;
    _max: IssueAssignmentMaxAggregateOutputType | null;
};
type GetIssueAssignmentGroupByPayload<T extends IssueAssignmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IssueAssignmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IssueAssignmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IssueAssignmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IssueAssignmentGroupByOutputType[P]>;
}>>;
export type IssueAssignmentWhereInput = {
    AND?: Prisma.IssueAssignmentWhereInput | Prisma.IssueAssignmentWhereInput[];
    OR?: Prisma.IssueAssignmentWhereInput[];
    NOT?: Prisma.IssueAssignmentWhereInput | Prisma.IssueAssignmentWhereInput[];
    id?: Prisma.StringFilter<"IssueAssignment"> | string;
    issueId?: Prisma.StringFilter<"IssueAssignment"> | string;
    engineerId?: Prisma.StringFilter<"IssueAssignment"> | string;
    assignedAt?: Prisma.DateTimeFilter<"IssueAssignment"> | Date | string;
    issue?: Prisma.XOR<Prisma.IssueScalarRelationFilter, Prisma.IssueWhereInput>;
    engineer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type IssueAssignmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    issueId?: Prisma.SortOrder;
    engineerId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    issue?: Prisma.IssueOrderByWithRelationInput;
    engineer?: Prisma.UserOrderByWithRelationInput;
};
export type IssueAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    issueId?: string;
    AND?: Prisma.IssueAssignmentWhereInput | Prisma.IssueAssignmentWhereInput[];
    OR?: Prisma.IssueAssignmentWhereInput[];
    NOT?: Prisma.IssueAssignmentWhereInput | Prisma.IssueAssignmentWhereInput[];
    engineerId?: Prisma.StringFilter<"IssueAssignment"> | string;
    assignedAt?: Prisma.DateTimeFilter<"IssueAssignment"> | Date | string;
    issue?: Prisma.XOR<Prisma.IssueScalarRelationFilter, Prisma.IssueWhereInput>;
    engineer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "issueId">;
export type IssueAssignmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    issueId?: Prisma.SortOrder;
    engineerId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    _count?: Prisma.IssueAssignmentCountOrderByAggregateInput;
    _max?: Prisma.IssueAssignmentMaxOrderByAggregateInput;
    _min?: Prisma.IssueAssignmentMinOrderByAggregateInput;
};
export type IssueAssignmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.IssueAssignmentScalarWhereWithAggregatesInput | Prisma.IssueAssignmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.IssueAssignmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IssueAssignmentScalarWhereWithAggregatesInput | Prisma.IssueAssignmentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"IssueAssignment"> | string;
    issueId?: Prisma.StringWithAggregatesFilter<"IssueAssignment"> | string;
    engineerId?: Prisma.StringWithAggregatesFilter<"IssueAssignment"> | string;
    assignedAt?: Prisma.DateTimeWithAggregatesFilter<"IssueAssignment"> | Date | string;
};
export type IssueAssignmentCreateInput = {
    id?: string;
    assignedAt?: Date | string;
    issue: Prisma.IssueCreateNestedOneWithoutAssignmentInput;
    engineer: Prisma.UserCreateNestedOneWithoutIssueAssignmentsInput;
};
export type IssueAssignmentUncheckedCreateInput = {
    id?: string;
    issueId: string;
    engineerId: string;
    assignedAt?: Date | string;
};
export type IssueAssignmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    issue?: Prisma.IssueUpdateOneRequiredWithoutAssignmentNestedInput;
    engineer?: Prisma.UserUpdateOneRequiredWithoutIssueAssignmentsNestedInput;
};
export type IssueAssignmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    issueId?: Prisma.StringFieldUpdateOperationsInput | string;
    engineerId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IssueAssignmentCreateManyInput = {
    id?: string;
    issueId: string;
    engineerId: string;
    assignedAt?: Date | string;
};
export type IssueAssignmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IssueAssignmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    issueId?: Prisma.StringFieldUpdateOperationsInput | string;
    engineerId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IssueAssignmentListRelationFilter = {
    every?: Prisma.IssueAssignmentWhereInput;
    some?: Prisma.IssueAssignmentWhereInput;
    none?: Prisma.IssueAssignmentWhereInput;
};
export type IssueAssignmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IssueAssignmentNullableScalarRelationFilter = {
    is?: Prisma.IssueAssignmentWhereInput | null;
    isNot?: Prisma.IssueAssignmentWhereInput | null;
};
export type IssueAssignmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    issueId?: Prisma.SortOrder;
    engineerId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
};
export type IssueAssignmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    issueId?: Prisma.SortOrder;
    engineerId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
};
export type IssueAssignmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    issueId?: Prisma.SortOrder;
    engineerId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
};
export type IssueAssignmentCreateNestedManyWithoutEngineerInput = {
    create?: Prisma.XOR<Prisma.IssueAssignmentCreateWithoutEngineerInput, Prisma.IssueAssignmentUncheckedCreateWithoutEngineerInput> | Prisma.IssueAssignmentCreateWithoutEngineerInput[] | Prisma.IssueAssignmentUncheckedCreateWithoutEngineerInput[];
    connectOrCreate?: Prisma.IssueAssignmentCreateOrConnectWithoutEngineerInput | Prisma.IssueAssignmentCreateOrConnectWithoutEngineerInput[];
    createMany?: Prisma.IssueAssignmentCreateManyEngineerInputEnvelope;
    connect?: Prisma.IssueAssignmentWhereUniqueInput | Prisma.IssueAssignmentWhereUniqueInput[];
};
export type IssueAssignmentUncheckedCreateNestedManyWithoutEngineerInput = {
    create?: Prisma.XOR<Prisma.IssueAssignmentCreateWithoutEngineerInput, Prisma.IssueAssignmentUncheckedCreateWithoutEngineerInput> | Prisma.IssueAssignmentCreateWithoutEngineerInput[] | Prisma.IssueAssignmentUncheckedCreateWithoutEngineerInput[];
    connectOrCreate?: Prisma.IssueAssignmentCreateOrConnectWithoutEngineerInput | Prisma.IssueAssignmentCreateOrConnectWithoutEngineerInput[];
    createMany?: Prisma.IssueAssignmentCreateManyEngineerInputEnvelope;
    connect?: Prisma.IssueAssignmentWhereUniqueInput | Prisma.IssueAssignmentWhereUniqueInput[];
};
export type IssueAssignmentUpdateManyWithoutEngineerNestedInput = {
    create?: Prisma.XOR<Prisma.IssueAssignmentCreateWithoutEngineerInput, Prisma.IssueAssignmentUncheckedCreateWithoutEngineerInput> | Prisma.IssueAssignmentCreateWithoutEngineerInput[] | Prisma.IssueAssignmentUncheckedCreateWithoutEngineerInput[];
    connectOrCreate?: Prisma.IssueAssignmentCreateOrConnectWithoutEngineerInput | Prisma.IssueAssignmentCreateOrConnectWithoutEngineerInput[];
    upsert?: Prisma.IssueAssignmentUpsertWithWhereUniqueWithoutEngineerInput | Prisma.IssueAssignmentUpsertWithWhereUniqueWithoutEngineerInput[];
    createMany?: Prisma.IssueAssignmentCreateManyEngineerInputEnvelope;
    set?: Prisma.IssueAssignmentWhereUniqueInput | Prisma.IssueAssignmentWhereUniqueInput[];
    disconnect?: Prisma.IssueAssignmentWhereUniqueInput | Prisma.IssueAssignmentWhereUniqueInput[];
    delete?: Prisma.IssueAssignmentWhereUniqueInput | Prisma.IssueAssignmentWhereUniqueInput[];
    connect?: Prisma.IssueAssignmentWhereUniqueInput | Prisma.IssueAssignmentWhereUniqueInput[];
    update?: Prisma.IssueAssignmentUpdateWithWhereUniqueWithoutEngineerInput | Prisma.IssueAssignmentUpdateWithWhereUniqueWithoutEngineerInput[];
    updateMany?: Prisma.IssueAssignmentUpdateManyWithWhereWithoutEngineerInput | Prisma.IssueAssignmentUpdateManyWithWhereWithoutEngineerInput[];
    deleteMany?: Prisma.IssueAssignmentScalarWhereInput | Prisma.IssueAssignmentScalarWhereInput[];
};
export type IssueAssignmentUncheckedUpdateManyWithoutEngineerNestedInput = {
    create?: Prisma.XOR<Prisma.IssueAssignmentCreateWithoutEngineerInput, Prisma.IssueAssignmentUncheckedCreateWithoutEngineerInput> | Prisma.IssueAssignmentCreateWithoutEngineerInput[] | Prisma.IssueAssignmentUncheckedCreateWithoutEngineerInput[];
    connectOrCreate?: Prisma.IssueAssignmentCreateOrConnectWithoutEngineerInput | Prisma.IssueAssignmentCreateOrConnectWithoutEngineerInput[];
    upsert?: Prisma.IssueAssignmentUpsertWithWhereUniqueWithoutEngineerInput | Prisma.IssueAssignmentUpsertWithWhereUniqueWithoutEngineerInput[];
    createMany?: Prisma.IssueAssignmentCreateManyEngineerInputEnvelope;
    set?: Prisma.IssueAssignmentWhereUniqueInput | Prisma.IssueAssignmentWhereUniqueInput[];
    disconnect?: Prisma.IssueAssignmentWhereUniqueInput | Prisma.IssueAssignmentWhereUniqueInput[];
    delete?: Prisma.IssueAssignmentWhereUniqueInput | Prisma.IssueAssignmentWhereUniqueInput[];
    connect?: Prisma.IssueAssignmentWhereUniqueInput | Prisma.IssueAssignmentWhereUniqueInput[];
    update?: Prisma.IssueAssignmentUpdateWithWhereUniqueWithoutEngineerInput | Prisma.IssueAssignmentUpdateWithWhereUniqueWithoutEngineerInput[];
    updateMany?: Prisma.IssueAssignmentUpdateManyWithWhereWithoutEngineerInput | Prisma.IssueAssignmentUpdateManyWithWhereWithoutEngineerInput[];
    deleteMany?: Prisma.IssueAssignmentScalarWhereInput | Prisma.IssueAssignmentScalarWhereInput[];
};
export type IssueAssignmentCreateNestedOneWithoutIssueInput = {
    create?: Prisma.XOR<Prisma.IssueAssignmentCreateWithoutIssueInput, Prisma.IssueAssignmentUncheckedCreateWithoutIssueInput>;
    connectOrCreate?: Prisma.IssueAssignmentCreateOrConnectWithoutIssueInput;
    connect?: Prisma.IssueAssignmentWhereUniqueInput;
};
export type IssueAssignmentUncheckedCreateNestedOneWithoutIssueInput = {
    create?: Prisma.XOR<Prisma.IssueAssignmentCreateWithoutIssueInput, Prisma.IssueAssignmentUncheckedCreateWithoutIssueInput>;
    connectOrCreate?: Prisma.IssueAssignmentCreateOrConnectWithoutIssueInput;
    connect?: Prisma.IssueAssignmentWhereUniqueInput;
};
export type IssueAssignmentUpdateOneWithoutIssueNestedInput = {
    create?: Prisma.XOR<Prisma.IssueAssignmentCreateWithoutIssueInput, Prisma.IssueAssignmentUncheckedCreateWithoutIssueInput>;
    connectOrCreate?: Prisma.IssueAssignmentCreateOrConnectWithoutIssueInput;
    upsert?: Prisma.IssueAssignmentUpsertWithoutIssueInput;
    disconnect?: Prisma.IssueAssignmentWhereInput | boolean;
    delete?: Prisma.IssueAssignmentWhereInput | boolean;
    connect?: Prisma.IssueAssignmentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.IssueAssignmentUpdateToOneWithWhereWithoutIssueInput, Prisma.IssueAssignmentUpdateWithoutIssueInput>, Prisma.IssueAssignmentUncheckedUpdateWithoutIssueInput>;
};
export type IssueAssignmentUncheckedUpdateOneWithoutIssueNestedInput = {
    create?: Prisma.XOR<Prisma.IssueAssignmentCreateWithoutIssueInput, Prisma.IssueAssignmentUncheckedCreateWithoutIssueInput>;
    connectOrCreate?: Prisma.IssueAssignmentCreateOrConnectWithoutIssueInput;
    upsert?: Prisma.IssueAssignmentUpsertWithoutIssueInput;
    disconnect?: Prisma.IssueAssignmentWhereInput | boolean;
    delete?: Prisma.IssueAssignmentWhereInput | boolean;
    connect?: Prisma.IssueAssignmentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.IssueAssignmentUpdateToOneWithWhereWithoutIssueInput, Prisma.IssueAssignmentUpdateWithoutIssueInput>, Prisma.IssueAssignmentUncheckedUpdateWithoutIssueInput>;
};
export type IssueAssignmentCreateWithoutEngineerInput = {
    id?: string;
    assignedAt?: Date | string;
    issue: Prisma.IssueCreateNestedOneWithoutAssignmentInput;
};
export type IssueAssignmentUncheckedCreateWithoutEngineerInput = {
    id?: string;
    issueId: string;
    assignedAt?: Date | string;
};
export type IssueAssignmentCreateOrConnectWithoutEngineerInput = {
    where: Prisma.IssueAssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.IssueAssignmentCreateWithoutEngineerInput, Prisma.IssueAssignmentUncheckedCreateWithoutEngineerInput>;
};
export type IssueAssignmentCreateManyEngineerInputEnvelope = {
    data: Prisma.IssueAssignmentCreateManyEngineerInput | Prisma.IssueAssignmentCreateManyEngineerInput[];
    skipDuplicates?: boolean;
};
export type IssueAssignmentUpsertWithWhereUniqueWithoutEngineerInput = {
    where: Prisma.IssueAssignmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.IssueAssignmentUpdateWithoutEngineerInput, Prisma.IssueAssignmentUncheckedUpdateWithoutEngineerInput>;
    create: Prisma.XOR<Prisma.IssueAssignmentCreateWithoutEngineerInput, Prisma.IssueAssignmentUncheckedCreateWithoutEngineerInput>;
};
export type IssueAssignmentUpdateWithWhereUniqueWithoutEngineerInput = {
    where: Prisma.IssueAssignmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.IssueAssignmentUpdateWithoutEngineerInput, Prisma.IssueAssignmentUncheckedUpdateWithoutEngineerInput>;
};
export type IssueAssignmentUpdateManyWithWhereWithoutEngineerInput = {
    where: Prisma.IssueAssignmentScalarWhereInput;
    data: Prisma.XOR<Prisma.IssueAssignmentUpdateManyMutationInput, Prisma.IssueAssignmentUncheckedUpdateManyWithoutEngineerInput>;
};
export type IssueAssignmentScalarWhereInput = {
    AND?: Prisma.IssueAssignmentScalarWhereInput | Prisma.IssueAssignmentScalarWhereInput[];
    OR?: Prisma.IssueAssignmentScalarWhereInput[];
    NOT?: Prisma.IssueAssignmentScalarWhereInput | Prisma.IssueAssignmentScalarWhereInput[];
    id?: Prisma.StringFilter<"IssueAssignment"> | string;
    issueId?: Prisma.StringFilter<"IssueAssignment"> | string;
    engineerId?: Prisma.StringFilter<"IssueAssignment"> | string;
    assignedAt?: Prisma.DateTimeFilter<"IssueAssignment"> | Date | string;
};
export type IssueAssignmentCreateWithoutIssueInput = {
    id?: string;
    assignedAt?: Date | string;
    engineer: Prisma.UserCreateNestedOneWithoutIssueAssignmentsInput;
};
export type IssueAssignmentUncheckedCreateWithoutIssueInput = {
    id?: string;
    engineerId: string;
    assignedAt?: Date | string;
};
export type IssueAssignmentCreateOrConnectWithoutIssueInput = {
    where: Prisma.IssueAssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.IssueAssignmentCreateWithoutIssueInput, Prisma.IssueAssignmentUncheckedCreateWithoutIssueInput>;
};
export type IssueAssignmentUpsertWithoutIssueInput = {
    update: Prisma.XOR<Prisma.IssueAssignmentUpdateWithoutIssueInput, Prisma.IssueAssignmentUncheckedUpdateWithoutIssueInput>;
    create: Prisma.XOR<Prisma.IssueAssignmentCreateWithoutIssueInput, Prisma.IssueAssignmentUncheckedCreateWithoutIssueInput>;
    where?: Prisma.IssueAssignmentWhereInput;
};
export type IssueAssignmentUpdateToOneWithWhereWithoutIssueInput = {
    where?: Prisma.IssueAssignmentWhereInput;
    data: Prisma.XOR<Prisma.IssueAssignmentUpdateWithoutIssueInput, Prisma.IssueAssignmentUncheckedUpdateWithoutIssueInput>;
};
export type IssueAssignmentUpdateWithoutIssueInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    engineer?: Prisma.UserUpdateOneRequiredWithoutIssueAssignmentsNestedInput;
};
export type IssueAssignmentUncheckedUpdateWithoutIssueInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    engineerId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IssueAssignmentCreateManyEngineerInput = {
    id?: string;
    issueId: string;
    assignedAt?: Date | string;
};
export type IssueAssignmentUpdateWithoutEngineerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    issue?: Prisma.IssueUpdateOneRequiredWithoutAssignmentNestedInput;
};
export type IssueAssignmentUncheckedUpdateWithoutEngineerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    issueId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IssueAssignmentUncheckedUpdateManyWithoutEngineerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    issueId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IssueAssignmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    issueId?: boolean;
    engineerId?: boolean;
    assignedAt?: boolean;
    issue?: boolean | Prisma.IssueDefaultArgs<ExtArgs>;
    engineer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["issueAssignment"]>;
export type IssueAssignmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    issueId?: boolean;
    engineerId?: boolean;
    assignedAt?: boolean;
    issue?: boolean | Prisma.IssueDefaultArgs<ExtArgs>;
    engineer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["issueAssignment"]>;
export type IssueAssignmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    issueId?: boolean;
    engineerId?: boolean;
    assignedAt?: boolean;
    issue?: boolean | Prisma.IssueDefaultArgs<ExtArgs>;
    engineer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["issueAssignment"]>;
export type IssueAssignmentSelectScalar = {
    id?: boolean;
    issueId?: boolean;
    engineerId?: boolean;
    assignedAt?: boolean;
};
export type IssueAssignmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "issueId" | "engineerId" | "assignedAt", ExtArgs["result"]["issueAssignment"]>;
export type IssueAssignmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    issue?: boolean | Prisma.IssueDefaultArgs<ExtArgs>;
    engineer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type IssueAssignmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    issue?: boolean | Prisma.IssueDefaultArgs<ExtArgs>;
    engineer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type IssueAssignmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    issue?: boolean | Prisma.IssueDefaultArgs<ExtArgs>;
    engineer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $IssueAssignmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "IssueAssignment";
    objects: {
        issue: Prisma.$IssuePayload<ExtArgs>;
        engineer: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        issueId: string;
        engineerId: string;
        assignedAt: Date;
    }, ExtArgs["result"]["issueAssignment"]>;
    composites: {};
};
export type IssueAssignmentGetPayload<S extends boolean | null | undefined | IssueAssignmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IssueAssignmentPayload, S>;
export type IssueAssignmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IssueAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IssueAssignmentCountAggregateInputType | true;
};
export interface IssueAssignmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['IssueAssignment'];
        meta: {
            name: 'IssueAssignment';
        };
    };
    /**
     * Find zero or one IssueAssignment that matches the filter.
     * @param {IssueAssignmentFindUniqueArgs} args - Arguments to find a IssueAssignment
     * @example
     * // Get one IssueAssignment
     * const issueAssignment = await prisma.issueAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IssueAssignmentFindUniqueArgs>(args: Prisma.SelectSubset<T, IssueAssignmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IssueAssignmentClient<runtime.Types.Result.GetResult<Prisma.$IssueAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one IssueAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IssueAssignmentFindUniqueOrThrowArgs} args - Arguments to find a IssueAssignment
     * @example
     * // Get one IssueAssignment
     * const issueAssignment = await prisma.issueAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IssueAssignmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IssueAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IssueAssignmentClient<runtime.Types.Result.GetResult<Prisma.$IssueAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first IssueAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssueAssignmentFindFirstArgs} args - Arguments to find a IssueAssignment
     * @example
     * // Get one IssueAssignment
     * const issueAssignment = await prisma.issueAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IssueAssignmentFindFirstArgs>(args?: Prisma.SelectSubset<T, IssueAssignmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__IssueAssignmentClient<runtime.Types.Result.GetResult<Prisma.$IssueAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first IssueAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssueAssignmentFindFirstOrThrowArgs} args - Arguments to find a IssueAssignment
     * @example
     * // Get one IssueAssignment
     * const issueAssignment = await prisma.issueAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IssueAssignmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IssueAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IssueAssignmentClient<runtime.Types.Result.GetResult<Prisma.$IssueAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more IssueAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssueAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IssueAssignments
     * const issueAssignments = await prisma.issueAssignment.findMany()
     *
     * // Get first 10 IssueAssignments
     * const issueAssignments = await prisma.issueAssignment.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const issueAssignmentWithIdOnly = await prisma.issueAssignment.findMany({ select: { id: true } })
     *
     */
    findMany<T extends IssueAssignmentFindManyArgs>(args?: Prisma.SelectSubset<T, IssueAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IssueAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a IssueAssignment.
     * @param {IssueAssignmentCreateArgs} args - Arguments to create a IssueAssignment.
     * @example
     * // Create one IssueAssignment
     * const IssueAssignment = await prisma.issueAssignment.create({
     *   data: {
     *     // ... data to create a IssueAssignment
     *   }
     * })
     *
     */
    create<T extends IssueAssignmentCreateArgs>(args: Prisma.SelectSubset<T, IssueAssignmentCreateArgs<ExtArgs>>): Prisma.Prisma__IssueAssignmentClient<runtime.Types.Result.GetResult<Prisma.$IssueAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many IssueAssignments.
     * @param {IssueAssignmentCreateManyArgs} args - Arguments to create many IssueAssignments.
     * @example
     * // Create many IssueAssignments
     * const issueAssignment = await prisma.issueAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends IssueAssignmentCreateManyArgs>(args?: Prisma.SelectSubset<T, IssueAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many IssueAssignments and returns the data saved in the database.
     * @param {IssueAssignmentCreateManyAndReturnArgs} args - Arguments to create many IssueAssignments.
     * @example
     * // Create many IssueAssignments
     * const issueAssignment = await prisma.issueAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many IssueAssignments and only return the `id`
     * const issueAssignmentWithIdOnly = await prisma.issueAssignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends IssueAssignmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IssueAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IssueAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a IssueAssignment.
     * @param {IssueAssignmentDeleteArgs} args - Arguments to delete one IssueAssignment.
     * @example
     * // Delete one IssueAssignment
     * const IssueAssignment = await prisma.issueAssignment.delete({
     *   where: {
     *     // ... filter to delete one IssueAssignment
     *   }
     * })
     *
     */
    delete<T extends IssueAssignmentDeleteArgs>(args: Prisma.SelectSubset<T, IssueAssignmentDeleteArgs<ExtArgs>>): Prisma.Prisma__IssueAssignmentClient<runtime.Types.Result.GetResult<Prisma.$IssueAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one IssueAssignment.
     * @param {IssueAssignmentUpdateArgs} args - Arguments to update one IssueAssignment.
     * @example
     * // Update one IssueAssignment
     * const issueAssignment = await prisma.issueAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends IssueAssignmentUpdateArgs>(args: Prisma.SelectSubset<T, IssueAssignmentUpdateArgs<ExtArgs>>): Prisma.Prisma__IssueAssignmentClient<runtime.Types.Result.GetResult<Prisma.$IssueAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more IssueAssignments.
     * @param {IssueAssignmentDeleteManyArgs} args - Arguments to filter IssueAssignments to delete.
     * @example
     * // Delete a few IssueAssignments
     * const { count } = await prisma.issueAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends IssueAssignmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, IssueAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more IssueAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssueAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IssueAssignments
     * const issueAssignment = await prisma.issueAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends IssueAssignmentUpdateManyArgs>(args: Prisma.SelectSubset<T, IssueAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more IssueAssignments and returns the data updated in the database.
     * @param {IssueAssignmentUpdateManyAndReturnArgs} args - Arguments to update many IssueAssignments.
     * @example
     * // Update many IssueAssignments
     * const issueAssignment = await prisma.issueAssignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more IssueAssignments and only return the `id`
     * const issueAssignmentWithIdOnly = await prisma.issueAssignment.updateManyAndReturn({
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
    updateManyAndReturn<T extends IssueAssignmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IssueAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IssueAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one IssueAssignment.
     * @param {IssueAssignmentUpsertArgs} args - Arguments to update or create a IssueAssignment.
     * @example
     * // Update or create a IssueAssignment
     * const issueAssignment = await prisma.issueAssignment.upsert({
     *   create: {
     *     // ... data to create a IssueAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IssueAssignment we want to update
     *   }
     * })
     */
    upsert<T extends IssueAssignmentUpsertArgs>(args: Prisma.SelectSubset<T, IssueAssignmentUpsertArgs<ExtArgs>>): Prisma.Prisma__IssueAssignmentClient<runtime.Types.Result.GetResult<Prisma.$IssueAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of IssueAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssueAssignmentCountArgs} args - Arguments to filter IssueAssignments to count.
     * @example
     * // Count the number of IssueAssignments
     * const count = await prisma.issueAssignment.count({
     *   where: {
     *     // ... the filter for the IssueAssignments we want to count
     *   }
     * })
    **/
    count<T extends IssueAssignmentCountArgs>(args?: Prisma.Subset<T, IssueAssignmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IssueAssignmentCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a IssueAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssueAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IssueAssignmentAggregateArgs>(args: Prisma.Subset<T, IssueAssignmentAggregateArgs>): Prisma.PrismaPromise<GetIssueAssignmentAggregateType<T>>;
    /**
     * Group by IssueAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IssueAssignmentGroupByArgs} args - Group by arguments.
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
    groupBy<T extends IssueAssignmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IssueAssignmentGroupByArgs['orderBy'];
    } : {
        orderBy?: IssueAssignmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IssueAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIssueAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the IssueAssignment model
     */
    readonly fields: IssueAssignmentFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for IssueAssignment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__IssueAssignmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    issue<T extends Prisma.IssueDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.IssueDefaultArgs<ExtArgs>>): Prisma.Prisma__IssueClient<runtime.Types.Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    engineer<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the IssueAssignment model
 */
export interface IssueAssignmentFieldRefs {
    readonly id: Prisma.FieldRef<"IssueAssignment", 'String'>;
    readonly issueId: Prisma.FieldRef<"IssueAssignment", 'String'>;
    readonly engineerId: Prisma.FieldRef<"IssueAssignment", 'String'>;
    readonly assignedAt: Prisma.FieldRef<"IssueAssignment", 'DateTime'>;
}
/**
 * IssueAssignment findUnique
 */
export type IssueAssignmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssueAssignment
     */
    select?: Prisma.IssueAssignmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IssueAssignment
     */
    omit?: Prisma.IssueAssignmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IssueAssignmentInclude<ExtArgs> | null;
    /**
     * Filter, which IssueAssignment to fetch.
     */
    where: Prisma.IssueAssignmentWhereUniqueInput;
};
/**
 * IssueAssignment findUniqueOrThrow
 */
export type IssueAssignmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssueAssignment
     */
    select?: Prisma.IssueAssignmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IssueAssignment
     */
    omit?: Prisma.IssueAssignmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IssueAssignmentInclude<ExtArgs> | null;
    /**
     * Filter, which IssueAssignment to fetch.
     */
    where: Prisma.IssueAssignmentWhereUniqueInput;
};
/**
 * IssueAssignment findFirst
 */
export type IssueAssignmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssueAssignment
     */
    select?: Prisma.IssueAssignmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IssueAssignment
     */
    omit?: Prisma.IssueAssignmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IssueAssignmentInclude<ExtArgs> | null;
    /**
     * Filter, which IssueAssignment to fetch.
     */
    where?: Prisma.IssueAssignmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of IssueAssignments to fetch.
     */
    orderBy?: Prisma.IssueAssignmentOrderByWithRelationInput | Prisma.IssueAssignmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for IssueAssignments.
     */
    cursor?: Prisma.IssueAssignmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` IssueAssignments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` IssueAssignments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of IssueAssignments.
     */
    distinct?: Prisma.IssueAssignmentScalarFieldEnum | Prisma.IssueAssignmentScalarFieldEnum[];
};
/**
 * IssueAssignment findFirstOrThrow
 */
export type IssueAssignmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssueAssignment
     */
    select?: Prisma.IssueAssignmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IssueAssignment
     */
    omit?: Prisma.IssueAssignmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IssueAssignmentInclude<ExtArgs> | null;
    /**
     * Filter, which IssueAssignment to fetch.
     */
    where?: Prisma.IssueAssignmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of IssueAssignments to fetch.
     */
    orderBy?: Prisma.IssueAssignmentOrderByWithRelationInput | Prisma.IssueAssignmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for IssueAssignments.
     */
    cursor?: Prisma.IssueAssignmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` IssueAssignments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` IssueAssignments.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of IssueAssignments.
     */
    distinct?: Prisma.IssueAssignmentScalarFieldEnum | Prisma.IssueAssignmentScalarFieldEnum[];
};
/**
 * IssueAssignment findMany
 */
export type IssueAssignmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssueAssignment
     */
    select?: Prisma.IssueAssignmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IssueAssignment
     */
    omit?: Prisma.IssueAssignmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IssueAssignmentInclude<ExtArgs> | null;
    /**
     * Filter, which IssueAssignments to fetch.
     */
    where?: Prisma.IssueAssignmentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of IssueAssignments to fetch.
     */
    orderBy?: Prisma.IssueAssignmentOrderByWithRelationInput | Prisma.IssueAssignmentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing IssueAssignments.
     */
    cursor?: Prisma.IssueAssignmentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` IssueAssignments from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` IssueAssignments.
     */
    skip?: number;
    distinct?: Prisma.IssueAssignmentScalarFieldEnum | Prisma.IssueAssignmentScalarFieldEnum[];
};
/**
 * IssueAssignment create
 */
export type IssueAssignmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssueAssignment
     */
    select?: Prisma.IssueAssignmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IssueAssignment
     */
    omit?: Prisma.IssueAssignmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IssueAssignmentInclude<ExtArgs> | null;
    /**
     * The data needed to create a IssueAssignment.
     */
    data: Prisma.XOR<Prisma.IssueAssignmentCreateInput, Prisma.IssueAssignmentUncheckedCreateInput>;
};
/**
 * IssueAssignment createMany
 */
export type IssueAssignmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many IssueAssignments.
     */
    data: Prisma.IssueAssignmentCreateManyInput | Prisma.IssueAssignmentCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * IssueAssignment createManyAndReturn
 */
export type IssueAssignmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssueAssignment
     */
    select?: Prisma.IssueAssignmentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the IssueAssignment
     */
    omit?: Prisma.IssueAssignmentOmit<ExtArgs> | null;
    /**
     * The data used to create many IssueAssignments.
     */
    data: Prisma.IssueAssignmentCreateManyInput | Prisma.IssueAssignmentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IssueAssignmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * IssueAssignment update
 */
export type IssueAssignmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssueAssignment
     */
    select?: Prisma.IssueAssignmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IssueAssignment
     */
    omit?: Prisma.IssueAssignmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IssueAssignmentInclude<ExtArgs> | null;
    /**
     * The data needed to update a IssueAssignment.
     */
    data: Prisma.XOR<Prisma.IssueAssignmentUpdateInput, Prisma.IssueAssignmentUncheckedUpdateInput>;
    /**
     * Choose, which IssueAssignment to update.
     */
    where: Prisma.IssueAssignmentWhereUniqueInput;
};
/**
 * IssueAssignment updateMany
 */
export type IssueAssignmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update IssueAssignments.
     */
    data: Prisma.XOR<Prisma.IssueAssignmentUpdateManyMutationInput, Prisma.IssueAssignmentUncheckedUpdateManyInput>;
    /**
     * Filter which IssueAssignments to update
     */
    where?: Prisma.IssueAssignmentWhereInput;
    /**
     * Limit how many IssueAssignments to update.
     */
    limit?: number;
};
/**
 * IssueAssignment updateManyAndReturn
 */
export type IssueAssignmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssueAssignment
     */
    select?: Prisma.IssueAssignmentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the IssueAssignment
     */
    omit?: Prisma.IssueAssignmentOmit<ExtArgs> | null;
    /**
     * The data used to update IssueAssignments.
     */
    data: Prisma.XOR<Prisma.IssueAssignmentUpdateManyMutationInput, Prisma.IssueAssignmentUncheckedUpdateManyInput>;
    /**
     * Filter which IssueAssignments to update
     */
    where?: Prisma.IssueAssignmentWhereInput;
    /**
     * Limit how many IssueAssignments to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IssueAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * IssueAssignment upsert
 */
export type IssueAssignmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssueAssignment
     */
    select?: Prisma.IssueAssignmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IssueAssignment
     */
    omit?: Prisma.IssueAssignmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IssueAssignmentInclude<ExtArgs> | null;
    /**
     * The filter to search for the IssueAssignment to update in case it exists.
     */
    where: Prisma.IssueAssignmentWhereUniqueInput;
    /**
     * In case the IssueAssignment found by the `where` argument doesn't exist, create a new IssueAssignment with this data.
     */
    create: Prisma.XOR<Prisma.IssueAssignmentCreateInput, Prisma.IssueAssignmentUncheckedCreateInput>;
    /**
     * In case the IssueAssignment was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.IssueAssignmentUpdateInput, Prisma.IssueAssignmentUncheckedUpdateInput>;
};
/**
 * IssueAssignment delete
 */
export type IssueAssignmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssueAssignment
     */
    select?: Prisma.IssueAssignmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IssueAssignment
     */
    omit?: Prisma.IssueAssignmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IssueAssignmentInclude<ExtArgs> | null;
    /**
     * Filter which IssueAssignment to delete.
     */
    where: Prisma.IssueAssignmentWhereUniqueInput;
};
/**
 * IssueAssignment deleteMany
 */
export type IssueAssignmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which IssueAssignments to delete
     */
    where?: Prisma.IssueAssignmentWhereInput;
    /**
     * Limit how many IssueAssignments to delete.
     */
    limit?: number;
};
/**
 * IssueAssignment without action
 */
export type IssueAssignmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IssueAssignment
     */
    select?: Prisma.IssueAssignmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the IssueAssignment
     */
    omit?: Prisma.IssueAssignmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.IssueAssignmentInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=IssueAssignment.d.ts.map