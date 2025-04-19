import { IoEllipsisHorizontal } from "react-icons/io5";
import React from 'react'
import Image from "next/image"
import { green, red } from "@/assets/icons";
import OverveiwOrgCard from "@/components/OverveiwOrgCard";
import { CgFileDocument } from "react-icons/cg";
import { ArrowBigDown } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = () => {
  return (
    <div className='flex flex-col pt-4 pb-4 px-6 lg:pt-10 lg:pb-10 lg:px-10 text-colors-BlueGray'>
      {/* fund cards */}
      <div className="flex flex-col md:flex-row gap-6 w-full md:max-w-[69%] justify-between">
        {/* income */}
        <div className="w-full h-[136px] border border-colors-LightGray rounded-xl">
          <div className="flex justify-between p-6">
            <div className="flex gap-3">
              <Image src={green} alt="income icon" />
              <div className="flex flex-col text-left gap-2">
                <p className="font-normal font-geist text-sm">Income</p>
                <h1 className="font-bold font-source text-3xl">$0</h1>
              </div>
            </div>
            <div>
              <IoEllipsisHorizontal className="" />
            </div>
          </div>
        </div>
        {/* expenditure */}
        <div className="w-full h-[136px] border border-colors-LightGray rounded-xl">
          <div className="flex justify-between p-6">
            <div className="flex gap-3">
              <Image src={red} alt="income icon" />
              <div className="flex flex-col text-left gap-2">
                <p className="font-normal font-geist text-sm">Expenditure</p>
                <h1 className="font-bold font-source text-3xl">$0</h1>
              </div>
            </div>
            <div>
              <IoEllipsisHorizontal className="" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse md:items-start md:justify-between gap-6 mt-6">
        <div className="mt-0 md:-mt-40">
          <OverveiwOrgCard />
        </div>
        <div className="w-full h-64 p-5 md:col-span-2 border bg-colors-WhiteSmoke rounded-xl mt-6 md:mt-4.5">
          <div className="flex justify-between ">
            <p className="font-bold">Money Flow</p>
            <Select >
              <SelectTrigger className="w-24 h-8 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="organization">Organization</SelectItem>
                  <SelectItem value="transaction">Transaction</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <ArrowBigDown className="w-5 h-5 rounded-lg text-white bg-colors-ButtonOrange px-0.5" />
            <p className="font-normal text-center"> You do not have any Money flow. Your money flow will appear here</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-6">

        <div className="w-full h-[430px] p-5 md:col-span-2 md:w-[69%] border bg-colors-WhiteSmoke rounded-xl">
          <div className="flex justify-between ">
            <p className="font-bold">Recent Transactions</p>
            <p className="font-normal text-colors-ButtonOrange hover:text-orange-300 cursor-pointer">Veiw all</p>
          </div>
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <CgFileDocument className="w-6 h-6 text-colors-ButtonOrange" />
            <p className="font-bold font-source text-bold text-lg ">No Transaction history</p>
            <p className="font-normal text-center"> You do not have any Transaction history.</p>
            <p className="font-normal text-center -mt-2">Your recent transactions will appear here.</p>
          </div>
        </div>

        <div className="w-full p-5 h-[430px] md:w-[350px] border bg-colors-WhiteSmoke rounded-xl text-base font-geist">
          <div className="flex justify-between ">
            <p className="font-bold">Upcoming Payment</p>
            <p className="font-normal text-colors-ButtonOrange hover:text-orange-300 cursor-pointer">Veiw all</p>
          </div>
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <CgFileDocument className="w-6 h-6 text-colors-ButtonOrange" />
            <p className="font-bold font-source text-bold text-lg ">No recurring payment</p>
            <p className="font-normal text-center"> You do not have any upcoming payment.</p>
            <p className="font-normal text-center -mt-2">Your scheduled payment will appear here.</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Dashboard
