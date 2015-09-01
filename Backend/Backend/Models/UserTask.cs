#region (C) ML-Software.ch, Zollikofen, Switzerland 2015
//  Filename:  UserTask.cs
//  Date: 26/08/2015
//  Author:  Matteo Locher
//  CONTENS:
//  DESCRIPTION: 
//  ----------------------------------------------------------------------------
//  Copyright (c) 2015. This software is subject to copyright protection under
//  the laws of Switzerland, European Union and other countries. This software is
//  the private properties of ML-Software.ch, Zollikofen, Switzerland and can not be
//  reproduced, distributed or given to a third party without the written consent
//  of ML-Software.ch.
#endregion

using System;

namespace Backend.Models
{
    public class UserTask
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }

        public double Time { get; set; }

        public DateTime Date{ get; set; }
    }
}