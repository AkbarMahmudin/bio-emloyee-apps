interface BioListProps {
  data: {
    jobApplied: string;
    ktp: string;
    placeDateBirth: string;
    gender: string;
    religion: string;
    bloodType: string;
    status: string;
    address: string;
    currentAddress: string;
    phone: string;
    closestPersonPhone: string;
    skills: string;
    availableEverywhere: boolean;
    expectedSalary: number;
  }
}

const items = [
  {
    label: "Posisi",
    name: "jobApplied",
  },
  {
    label: "No KTP",
    name: "ktp",
  },
  {
    label: "Tempat, Tanggal Lahir",
    name: "placeDateBirth",
  },
  {
    label: "Jenis Kelamin",
    name: "gender",
  },
  {
    label: "Agama",
    name: "religion",
  },
  {
    label: "Golongan Darah",
    name: "bloodType",
  },
  {
    label: "Status",
    name: "status",
  },
  {
    label: "Alamat KTP",
    name: "address",
  },
  {
    label: "Alamat Sekarang",
    name: "currentAddress",
  },
  {
    label: "No HP",
    name: "phone",
  },
  {
    label: "No HP Orang Terdekat",
    name: "closestPersonPhone",
  },
  {
    label: "Kemampuan",
    name: "skills",
  },
];

const BioList = ({ data }: BioListProps) => {
  return (
    <div className="pt-4">
      {items.map((item, index) => (
        <div key={index} className="flex flex-row mb-2">
          <div className="w-1/3">{item.label}</div>
          <div className="w-2/3">{data[item.name]}</div>
        </div>
      ))}
    </div>
  )
}

export default BioList