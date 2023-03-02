-- CreateTable
CREATE TABLE "Printers_3D" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ip_adress" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "online" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Printers_3D_ip_adress_key" ON "Printers_3D"("ip_adress");
