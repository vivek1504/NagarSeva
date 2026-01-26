import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Potholes
 *
 */
export type PotholesModel = runtime.Types.Result.DefaultSelection<Prisma.$PotholesPayload>;
export type AggregatePotholes = {
    _count: PotholesCountAggregateOutputType | null;
    _avg: PotholesAvgAggregateOutputType | null;
    _sum: PotholesSumAggregateOutputType | null;
    _min: PotholesMinAggregateOutputType | null;
    _max: PotholesMaxAggregateOutputType | null;
};
export type PotholesAvgAggregateOutputType = {
    potholes: number | null;
};
export type PotholesSumAggregateOutputType = {
    potholes: number | null;
};
export type PotholesMinAggregateOutputType = {
    id: string | null;
    potholes: number | null;
};
export type PotholesMaxAggregateOutputType = {
    id: string | null;
    potholes: number | null;
};
export type PotholesCountAggregateOutputType = {
    id: number;
    potholes: number;
    _all: number;
};
export type PotholesAvgAggregateInputType = {
    potholes?: true;
};
export type PotholesSumAggregateInputType = {
    potholes?: true;
};
export type PotholesMinAggregateInputType = {
    id?: true;
    potholes?: true;
};
export type PotholesMaxAggregateInputType = {
    id?: true;
    potholes?: true;
};
export type PotholesCountAggregateInputType = {
    id?: true;
    potholes?: true;
    _all?: true;
};
export type PotholesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Potholes to aggregate.
     */
    where?: Prisma.PotholesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Potholes to fetch.
     */
    orderBy?: Prisma.PotholesOrderByWithRelationInput | Prisma.PotholesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PotholesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Potholes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Potholes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Potholes
    **/
    _count?: true | PotholesCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PotholesAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PotholesSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PotholesMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PotholesMaxAggregateInputType;
};
export type GetPotholesAggregateType<T extends PotholesAggregateArgs> = {
    [P in keyof T & keyof AggregatePotholes]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePotholes[P]> : Prisma.GetScalarType<T[P], AggregatePotholes[P]>;
};
export type PotholesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PotholesWhereInput;
    orderBy?: Prisma.PotholesOrderByWithAggregationInput | Prisma.PotholesOrderByWithAggregationInput[];
    by: Prisma.PotholesScalarFieldEnum[] | Prisma.PotholesScalarFieldEnum;
    having?: Prisma.PotholesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PotholesCountAggregateInputType | true;
    _avg?: PotholesAvgAggregateInputType;
    _sum?: PotholesSumAggregateInputType;
    _min?: PotholesMinAggregateInputType;
    _max?: PotholesMaxAggregateInputType;
};
export type PotholesGroupByOutputType = {
    id: string;
    potholes: number;
    _count: PotholesCountAggregateOutputType | null;
    _avg: PotholesAvgAggregateOutputType | null;
    _sum: PotholesSumAggregateOutputType | null;
    _min: PotholesMinAggregateOutputType | null;
    _max: PotholesMaxAggregateOutputType | null;
};
type GetPotholesGroupByPayload<T extends PotholesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PotholesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PotholesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PotholesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PotholesGroupByOutputType[P]>;
}>>;
export type PotholesWhereInput = {
    AND?: Prisma.PotholesWhereInput | Prisma.PotholesWhereInput[];
    OR?: Prisma.PotholesWhereInput[];
    NOT?: Prisma.PotholesWhereInput | Prisma.PotholesWhereInput[];
    id?: Prisma.StringFilter<"Potholes"> | string;
    potholes?: Prisma.IntFilter<"Potholes"> | number;
};
export type PotholesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    potholes?: Prisma.SortOrder;
};
export type PotholesWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PotholesWhereInput | Prisma.PotholesWhereInput[];
    OR?: Prisma.PotholesWhereInput[];
    NOT?: Prisma.PotholesWhereInput | Prisma.PotholesWhereInput[];
    potholes?: Prisma.IntFilter<"Potholes"> | number;
}, "id">;
export type PotholesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    potholes?: Prisma.SortOrder;
    _count?: Prisma.PotholesCountOrderByAggregateInput;
    _avg?: Prisma.PotholesAvgOrderByAggregateInput;
    _max?: Prisma.PotholesMaxOrderByAggregateInput;
    _min?: Prisma.PotholesMinOrderByAggregateInput;
    _sum?: Prisma.PotholesSumOrderByAggregateInput;
};
export type PotholesScalarWhereWithAggregatesInput = {
    AND?: Prisma.PotholesScalarWhereWithAggregatesInput | Prisma.PotholesScalarWhereWithAggregatesInput[];
    OR?: Prisma.PotholesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PotholesScalarWhereWithAggregatesInput | Prisma.PotholesScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Potholes"> | string;
    potholes?: Prisma.IntWithAggregatesFilter<"Potholes"> | number;
};
export type PotholesCreateInput = {
    id?: string;
    potholes?: number;
};
export type PotholesUncheckedCreateInput = {
    id?: string;
    potholes?: number;
};
export type PotholesUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    potholes?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PotholesUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    potholes?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PotholesCreateManyInput = {
    id?: string;
    potholes?: number;
};
export type PotholesUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    potholes?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PotholesUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    potholes?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PotholesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    potholes?: Prisma.SortOrder;
};
export type PotholesAvgOrderByAggregateInput = {
    potholes?: Prisma.SortOrder;
};
export type PotholesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    potholes?: Prisma.SortOrder;
};
export type PotholesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    potholes?: Prisma.SortOrder;
};
export type PotholesSumOrderByAggregateInput = {
    potholes?: Prisma.SortOrder;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type PotholesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    potholes?: boolean;
}, ExtArgs["result"]["potholes"]>;
export type PotholesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    potholes?: boolean;
}, ExtArgs["result"]["potholes"]>;
export type PotholesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    potholes?: boolean;
}, ExtArgs["result"]["potholes"]>;
export type PotholesSelectScalar = {
    id?: boolean;
    potholes?: boolean;
};
export type PotholesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "potholes", ExtArgs["result"]["potholes"]>;
export type $PotholesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Potholes";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        potholes: number;
    }, ExtArgs["result"]["potholes"]>;
    composites: {};
};
export type PotholesGetPayload<S extends boolean | null | undefined | PotholesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PotholesPayload, S>;
export type PotholesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PotholesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PotholesCountAggregateInputType | true;
};
export interface PotholesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Potholes'];
        meta: {
            name: 'Potholes';
        };
    };
    /**
     * Find zero or one Potholes that matches the filter.
     * @param {PotholesFindUniqueArgs} args - Arguments to find a Potholes
     * @example
     * // Get one Potholes
     * const potholes = await prisma.potholes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PotholesFindUniqueArgs>(args: Prisma.SelectSubset<T, PotholesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PotholesClient<runtime.Types.Result.GetResult<Prisma.$PotholesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Potholes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PotholesFindUniqueOrThrowArgs} args - Arguments to find a Potholes
     * @example
     * // Get one Potholes
     * const potholes = await prisma.potholes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PotholesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PotholesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PotholesClient<runtime.Types.Result.GetResult<Prisma.$PotholesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Potholes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PotholesFindFirstArgs} args - Arguments to find a Potholes
     * @example
     * // Get one Potholes
     * const potholes = await prisma.potholes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PotholesFindFirstArgs>(args?: Prisma.SelectSubset<T, PotholesFindFirstArgs<ExtArgs>>): Prisma.Prisma__PotholesClient<runtime.Types.Result.GetResult<Prisma.$PotholesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Potholes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PotholesFindFirstOrThrowArgs} args - Arguments to find a Potholes
     * @example
     * // Get one Potholes
     * const potholes = await prisma.potholes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PotholesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PotholesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PotholesClient<runtime.Types.Result.GetResult<Prisma.$PotholesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Potholes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PotholesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Potholes
     * const potholes = await prisma.potholes.findMany()
     *
     * // Get first 10 Potholes
     * const potholes = await prisma.potholes.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const potholesWithIdOnly = await prisma.potholes.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PotholesFindManyArgs>(args?: Prisma.SelectSubset<T, PotholesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PotholesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Potholes.
     * @param {PotholesCreateArgs} args - Arguments to create a Potholes.
     * @example
     * // Create one Potholes
     * const Potholes = await prisma.potholes.create({
     *   data: {
     *     // ... data to create a Potholes
     *   }
     * })
     *
     */
    create<T extends PotholesCreateArgs>(args: Prisma.SelectSubset<T, PotholesCreateArgs<ExtArgs>>): Prisma.Prisma__PotholesClient<runtime.Types.Result.GetResult<Prisma.$PotholesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Potholes.
     * @param {PotholesCreateManyArgs} args - Arguments to create many Potholes.
     * @example
     * // Create many Potholes
     * const potholes = await prisma.potholes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PotholesCreateManyArgs>(args?: Prisma.SelectSubset<T, PotholesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Potholes and returns the data saved in the database.
     * @param {PotholesCreateManyAndReturnArgs} args - Arguments to create many Potholes.
     * @example
     * // Create many Potholes
     * const potholes = await prisma.potholes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Potholes and only return the `id`
     * const potholesWithIdOnly = await prisma.potholes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PotholesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PotholesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PotholesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Potholes.
     * @param {PotholesDeleteArgs} args - Arguments to delete one Potholes.
     * @example
     * // Delete one Potholes
     * const Potholes = await prisma.potholes.delete({
     *   where: {
     *     // ... filter to delete one Potholes
     *   }
     * })
     *
     */
    delete<T extends PotholesDeleteArgs>(args: Prisma.SelectSubset<T, PotholesDeleteArgs<ExtArgs>>): Prisma.Prisma__PotholesClient<runtime.Types.Result.GetResult<Prisma.$PotholesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Potholes.
     * @param {PotholesUpdateArgs} args - Arguments to update one Potholes.
     * @example
     * // Update one Potholes
     * const potholes = await prisma.potholes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PotholesUpdateArgs>(args: Prisma.SelectSubset<T, PotholesUpdateArgs<ExtArgs>>): Prisma.Prisma__PotholesClient<runtime.Types.Result.GetResult<Prisma.$PotholesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Potholes.
     * @param {PotholesDeleteManyArgs} args - Arguments to filter Potholes to delete.
     * @example
     * // Delete a few Potholes
     * const { count } = await prisma.potholes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PotholesDeleteManyArgs>(args?: Prisma.SelectSubset<T, PotholesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Potholes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PotholesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Potholes
     * const potholes = await prisma.potholes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PotholesUpdateManyArgs>(args: Prisma.SelectSubset<T, PotholesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Potholes and returns the data updated in the database.
     * @param {PotholesUpdateManyAndReturnArgs} args - Arguments to update many Potholes.
     * @example
     * // Update many Potholes
     * const potholes = await prisma.potholes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Potholes and only return the `id`
     * const potholesWithIdOnly = await prisma.potholes.updateManyAndReturn({
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
    updateManyAndReturn<T extends PotholesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PotholesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PotholesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Potholes.
     * @param {PotholesUpsertArgs} args - Arguments to update or create a Potholes.
     * @example
     * // Update or create a Potholes
     * const potholes = await prisma.potholes.upsert({
     *   create: {
     *     // ... data to create a Potholes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Potholes we want to update
     *   }
     * })
     */
    upsert<T extends PotholesUpsertArgs>(args: Prisma.SelectSubset<T, PotholesUpsertArgs<ExtArgs>>): Prisma.Prisma__PotholesClient<runtime.Types.Result.GetResult<Prisma.$PotholesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Potholes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PotholesCountArgs} args - Arguments to filter Potholes to count.
     * @example
     * // Count the number of Potholes
     * const count = await prisma.potholes.count({
     *   where: {
     *     // ... the filter for the Potholes we want to count
     *   }
     * })
    **/
    count<T extends PotholesCountArgs>(args?: Prisma.Subset<T, PotholesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PotholesCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Potholes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PotholesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PotholesAggregateArgs>(args: Prisma.Subset<T, PotholesAggregateArgs>): Prisma.PrismaPromise<GetPotholesAggregateType<T>>;
    /**
     * Group by Potholes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PotholesGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PotholesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PotholesGroupByArgs['orderBy'];
    } : {
        orderBy?: PotholesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PotholesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPotholesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Potholes model
     */
    readonly fields: PotholesFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Potholes.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PotholesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
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
 * Fields of the Potholes model
 */
export interface PotholesFieldRefs {
    readonly id: Prisma.FieldRef<"Potholes", 'String'>;
    readonly potholes: Prisma.FieldRef<"Potholes", 'Int'>;
}
/**
 * Potholes findUnique
 */
export type PotholesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Potholes
     */
    select?: Prisma.PotholesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Potholes
     */
    omit?: Prisma.PotholesOmit<ExtArgs> | null;
    /**
     * Filter, which Potholes to fetch.
     */
    where: Prisma.PotholesWhereUniqueInput;
};
/**
 * Potholes findUniqueOrThrow
 */
export type PotholesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Potholes
     */
    select?: Prisma.PotholesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Potholes
     */
    omit?: Prisma.PotholesOmit<ExtArgs> | null;
    /**
     * Filter, which Potholes to fetch.
     */
    where: Prisma.PotholesWhereUniqueInput;
};
/**
 * Potholes findFirst
 */
export type PotholesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Potholes
     */
    select?: Prisma.PotholesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Potholes
     */
    omit?: Prisma.PotholesOmit<ExtArgs> | null;
    /**
     * Filter, which Potholes to fetch.
     */
    where?: Prisma.PotholesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Potholes to fetch.
     */
    orderBy?: Prisma.PotholesOrderByWithRelationInput | Prisma.PotholesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Potholes.
     */
    cursor?: Prisma.PotholesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Potholes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Potholes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Potholes.
     */
    distinct?: Prisma.PotholesScalarFieldEnum | Prisma.PotholesScalarFieldEnum[];
};
/**
 * Potholes findFirstOrThrow
 */
export type PotholesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Potholes
     */
    select?: Prisma.PotholesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Potholes
     */
    omit?: Prisma.PotholesOmit<ExtArgs> | null;
    /**
     * Filter, which Potholes to fetch.
     */
    where?: Prisma.PotholesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Potholes to fetch.
     */
    orderBy?: Prisma.PotholesOrderByWithRelationInput | Prisma.PotholesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Potholes.
     */
    cursor?: Prisma.PotholesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Potholes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Potholes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Potholes.
     */
    distinct?: Prisma.PotholesScalarFieldEnum | Prisma.PotholesScalarFieldEnum[];
};
/**
 * Potholes findMany
 */
export type PotholesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Potholes
     */
    select?: Prisma.PotholesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Potholes
     */
    omit?: Prisma.PotholesOmit<ExtArgs> | null;
    /**
     * Filter, which Potholes to fetch.
     */
    where?: Prisma.PotholesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Potholes to fetch.
     */
    orderBy?: Prisma.PotholesOrderByWithRelationInput | Prisma.PotholesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Potholes.
     */
    cursor?: Prisma.PotholesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Potholes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Potholes.
     */
    skip?: number;
    distinct?: Prisma.PotholesScalarFieldEnum | Prisma.PotholesScalarFieldEnum[];
};
/**
 * Potholes create
 */
export type PotholesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Potholes
     */
    select?: Prisma.PotholesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Potholes
     */
    omit?: Prisma.PotholesOmit<ExtArgs> | null;
    /**
     * The data needed to create a Potholes.
     */
    data?: Prisma.XOR<Prisma.PotholesCreateInput, Prisma.PotholesUncheckedCreateInput>;
};
/**
 * Potholes createMany
 */
export type PotholesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Potholes.
     */
    data: Prisma.PotholesCreateManyInput | Prisma.PotholesCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Potholes createManyAndReturn
 */
export type PotholesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Potholes
     */
    select?: Prisma.PotholesSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Potholes
     */
    omit?: Prisma.PotholesOmit<ExtArgs> | null;
    /**
     * The data used to create many Potholes.
     */
    data: Prisma.PotholesCreateManyInput | Prisma.PotholesCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Potholes update
 */
export type PotholesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Potholes
     */
    select?: Prisma.PotholesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Potholes
     */
    omit?: Prisma.PotholesOmit<ExtArgs> | null;
    /**
     * The data needed to update a Potholes.
     */
    data: Prisma.XOR<Prisma.PotholesUpdateInput, Prisma.PotholesUncheckedUpdateInput>;
    /**
     * Choose, which Potholes to update.
     */
    where: Prisma.PotholesWhereUniqueInput;
};
/**
 * Potholes updateMany
 */
export type PotholesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Potholes.
     */
    data: Prisma.XOR<Prisma.PotholesUpdateManyMutationInput, Prisma.PotholesUncheckedUpdateManyInput>;
    /**
     * Filter which Potholes to update
     */
    where?: Prisma.PotholesWhereInput;
    /**
     * Limit how many Potholes to update.
     */
    limit?: number;
};
/**
 * Potholes updateManyAndReturn
 */
export type PotholesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Potholes
     */
    select?: Prisma.PotholesSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Potholes
     */
    omit?: Prisma.PotholesOmit<ExtArgs> | null;
    /**
     * The data used to update Potholes.
     */
    data: Prisma.XOR<Prisma.PotholesUpdateManyMutationInput, Prisma.PotholesUncheckedUpdateManyInput>;
    /**
     * Filter which Potholes to update
     */
    where?: Prisma.PotholesWhereInput;
    /**
     * Limit how many Potholes to update.
     */
    limit?: number;
};
/**
 * Potholes upsert
 */
export type PotholesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Potholes
     */
    select?: Prisma.PotholesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Potholes
     */
    omit?: Prisma.PotholesOmit<ExtArgs> | null;
    /**
     * The filter to search for the Potholes to update in case it exists.
     */
    where: Prisma.PotholesWhereUniqueInput;
    /**
     * In case the Potholes found by the `where` argument doesn't exist, create a new Potholes with this data.
     */
    create: Prisma.XOR<Prisma.PotholesCreateInput, Prisma.PotholesUncheckedCreateInput>;
    /**
     * In case the Potholes was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PotholesUpdateInput, Prisma.PotholesUncheckedUpdateInput>;
};
/**
 * Potholes delete
 */
export type PotholesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Potholes
     */
    select?: Prisma.PotholesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Potholes
     */
    omit?: Prisma.PotholesOmit<ExtArgs> | null;
    /**
     * Filter which Potholes to delete.
     */
    where: Prisma.PotholesWhereUniqueInput;
};
/**
 * Potholes deleteMany
 */
export type PotholesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Potholes to delete
     */
    where?: Prisma.PotholesWhereInput;
    /**
     * Limit how many Potholes to delete.
     */
    limit?: number;
};
/**
 * Potholes without action
 */
export type PotholesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Potholes
     */
    select?: Prisma.PotholesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Potholes
     */
    omit?: Prisma.PotholesOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Potholes.d.ts.map