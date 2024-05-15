"use server"

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs/server"
class UserNotFoundErr extends Error{}
export async function GetFormStats(){
    const user= await currentUser();
    if(!user){
        throw new UserNotFoundErr()
    }
    const stats= await prisma.form.aggregate({
        where: {
            userId: user.id
        },
        _sum: {
            visits: true,
            submissions: true,
        }
    })
    const visits= stats._sum.visits || 0;
    const submissions= stats._sum .submissions|| 0;
    let submissionsRate=0;
    if(visits>0) submissionsRate= (submissions/visits)*100;
    const bounceRate= 100-submissionsRate;
    return {
        visits, submissions, submissionsRate, bounceRate
    }
}

export async function CreateForm(data: formSchemaType){
    const validation= formSchema.safeParse(data);
    if(!validation.success){
        throw new Error("form not valid")
    }
    const userId= await currentUser()
    const form= await prisma.form.create({
        data: {
            userId:  userId?.id as string,
            name: data.name,
            description: data.description
        }
    })
    if(!form){
        throw new Error("something went wrong")
    }
    return form.id

}

export async function GetForms(){
    const user= await currentUser();
    return await prisma.form.findMany({
        where: {
            userId: user?.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}